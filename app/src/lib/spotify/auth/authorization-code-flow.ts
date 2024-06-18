"use server";

import { db, VercelPoolClient } from "@vercel/postgres";
import { cookies } from "next/headers";

export const getRawDbAccessToken = async (): Promise<string> => {

    let userId: string;
    let client: VercelPoolClient;

    // =====================
    //     Check Cookies
    // =====================

    try {
        const userIdCookie = cookies().get("loopdigger_user_id");
        if (userIdCookie === undefined) throw new Error ("No loopdigger_user_id cookie found.");
        else userId = userIdCookie.value;
    }

    catch (error) {
        throw error;
    }

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
