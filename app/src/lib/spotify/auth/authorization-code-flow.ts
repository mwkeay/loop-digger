"use server";

import { db, VercelPoolClient } from "@vercel/postgres";

export const getRawDbAccessToken = async (userId: string): Promise<string> => {

    let client: VercelPoolClient;

    // ============================
    //     Connect To Database
    // ============================

    try {
        client = await db.connect();
    }

    catch (error) {
        throw error;
    }

    // ============================
    //     Insert Into Database
    // ============================

    try {
        const accessToken = (await client.sql`
            SELECT access_token FROM user_authorization WHERE user_id = ${userId};
        `).rows[0].access_token;

        if (typeof accessToken != "string") throw new Error("Database access_token return type not string.");

        client.release();

        return accessToken;
    }

    catch (error) {
        client.release();
        throw error;
    }
};
