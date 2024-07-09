"use server";

import { EditorContextMeta, EditorContextSample } from "@/lib/editor/context";
import logger from "@/lib/logger";
import { QueryResultRow, VercelPoolClient, db } from "@vercel/postgres";
import getTrack from "./getTrack";

const getBreakdown = async (id: number) => {

    let client: VercelPoolClient;

    let breakdownRow: QueryResultRow;
    let sampleRows: QueryResultRow[]; 

    let breakdown: {
        meta: EditorContextMeta
        track: Track
        samples: EditorContextSample[]
    };

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

    // =============================
    //     Get Breakdown from DB
    // =============================

    try {
        breakdownRow = (await db.sql`SELECT * FROM breakdown WHERE id = ${id};`).rows[0];
        sampleRows = (await db.sql`SELECT * FROM breakdown_sample WHERE breakdown_id = ${id};`).rows;

        const meta: EditorContextMeta = {
            authorId: breakdownRow.author,
            databaseId: id,
            created: new Date(breakdownRow.created),
            public: breakdownRow.public,
        };

        const track = await getTrack(breakdownRow.track_id);
        if (!track) throw new Error("Invalid track ID in database breakdown.");

        const samples: EditorContextSample[] = await Promise.all(sampleRows.map(async (row) => ({
            track: await getTrack(row.track_id),
            startMs: row.start_ms,
            durationMs: row.duration_ms,
        })));

        breakdown = { meta, track, samples };
    }

    catch (error) {
        logger.error("Database connection failed.", error);
        throw error;
    }

    return breakdown;
};

export default getBreakdown;
