"use server";

import { EditorContext, EditorContextMeta, EditorContextSample } from "@/lib/editor/context";
import logger from "@/lib/logger";
import { QueryResultRow, VercelPoolClient, db } from "@vercel/postgres";
import { cookies } from "next/headers";

const saveBreakdown = async (meta: EditorContextMeta, trackId: string | undefined, samples: EditorContextSample[]) => {

    let client: VercelPoolClient;

    // ==============================
    //     Check User Credentials
    // ==============================

    const userId = cookies().get("loopdigger_user_id");

    // Check user authenticated
    if (!userId?.value) throw new Error("user unauthenticated");
    // Check user is author
    if (Number(userId.value) != meta.authorId) throw new Error("authenticated user does not match author");

    // ============================
    //     Connect To Database
    // ============================

    try {
        client = await db.connect();
    }

    catch (error) {
        logger.error("Database connection failed.", error);
        throw error;
    }

    // ==========================
    //     Insert/Update Data
    // ==========================

    let newBreakdownId: number | null = null;

    try {
        // Begin transaction
        client.query("BEGIN");

        // =================
        //     Breakdown
        // =================

        let exisitingBreakdown: QueryResultRow | null = null;

        if (meta.databaseId) {
            exisitingBreakdown = (await (db.sql`SELECT * FROM breakdown WHERE id = ${meta.databaseId};`)).rows[0];
        }

        // Update
        if (exisitingBreakdown) {
            await db.sql`
                UPDATE breakdown
                SET
                    track_id = ${trackId ?? null},
                    public = ${meta.public}
                WHERE id = ${meta.databaseId};
            `;
        }
        // Insert
        else {
            const result = await db.sql`
                INSERT INTO breakdown (track_id, author, created, public)
                VALUES (
                    ${trackId ?? null},
                    ${meta.authorId},
                    ${meta.created.toISOString()},
                    ${meta.public}
                )
                RETURNING id;
            `;

            newBreakdownId = result.rows[0].id;
            if (!newBreakdownId) throw new Error("No id found in result.rows on breakdown insert");
        }

        // ===============
        //     Samples
        // ===============

        // Delete existing samples
        if (exisitingBreakdown) await db.sql`DELETE FROM breakdown_sample WHERE breakdown_id = ${meta.databaseId};`;

        // Insert all samples
        await Promise.all(samples.map(async (sample, index) => {
            await db.sql`
                INSERT INTO breakdown_sample (breakdown_id, sample_no, track_id, start_ms, duration_ms)
                VALUES (
                    ${exisitingBreakdown ? meta.databaseId : newBreakdownId},
                    ${index},
                    ${sample.track?.id ?? null},
                    ${sample.startMs ?? null},
                    ${sample.durationMs ?? null}
                );
            `;
        }));

        // Commit transaction
        await client.query("COMMIT");
    }
    
    catch (error) {
        logger.error("Failed to save breakdown to database.", error);
        throw error;
    }

    finally {
        client.release()
    }

    return newBreakdownId;
};

export default saveBreakdown;
