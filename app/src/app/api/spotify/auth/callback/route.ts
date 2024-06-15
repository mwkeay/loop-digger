import config from "@/app/lib/config";
import spotifyConfig from "@/app/lib/spotify/config";
import { SpotifyOAuthResponse } from "@/types/spotify/auth";
import { Me } from "@/types/spotify/users";
import { db, VercelPoolClient } from "@vercel/postgres";
import { cookies } from "next/headers";

export const GET = async (request: Request) => {

    const { searchParams } = new URL(request.url);
    const authCode = searchParams.get("code");

    cookies().set("test", "WAHDUFDIF");

    if (!authCode) {
        console.error("No authorization code found in callback search params.");
        return Response.redirect(config.rootUrl);
    }

    let tokens: SpotifyOAuthResponse;
    let user: Me;
    let client: VercelPoolClient;
    
    // =========================
    //     Acess Token Fetch
    // =========================

    try {
        const authResponse = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code: authCode,
                redirect_uri: spotifyConfig.redirectUri,
                client_id: spotifyConfig.clientId,
                client_secret: spotifyConfig.clientSecret,
            }),
        });

        tokens = await authResponse.json();

        if (!tokens.access_token) throw new Error("No access_token attribute in Spotify auth code token response JSON.");
        if (!tokens.refresh_token) throw new Error("No refresh_token attribute in Spotify auth code token response JSON.");
        if (!tokens.expires_in) throw new Error("No expires_in attribute in Spotify auth code token response JSON.");
        if (!token.expires_in) throw new Error("No expires_in attribute in Spotify auth code token response JSON.");
    }

    catch (error) {
        console.error("Access token fetch failed.", error);
        return;
    }

    // =============================
    //     Spotify Account Fetch
    // =============================

    try {
        const meResponse = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + tokens.access_token,
            },
        });

        user = await meResponse.json();

        if (!user.id) throw new Error("No id attribute in /me response JSON.");

        cookies().set({ name: "loopdigger_spotify_user_id", value: user.id, path: "/", httpOnly: false });
    }

    catch (error) {
        console.error("Spoify account fetch failed.", error);
        return;
    }

    // ============================
    //     Connect To Database
    // ============================

    try {
        client = await db.connect();
    }

    catch (error) {
        console.error("Database connection failed.", error);
        return;
    }

    // ============================
    //     Insert Into Database
    // ============================

    try {
        // Begin transaction
        client.query("BEGIN");

        // Create user record
        await client.sql`
        INSERT INTO user_account (spotify_user_id) VALUES (${user.id})
        ON CONFLICT DO NOTHING;
        `;

        // Get user ID
        const userId = (await client.sql`
            SELECT id FROM user_account WHERE spotify_user_id = ${user.id};
        `).rows[0].id;

        // Create user ID cookie
        cookies().set({ name: "loopdigger_user_id", value: userId, path: "/", httpOnly: false });

        // Create/update database tokens
        await client.sql`
            INSERT INTO user_authorization (user_id, access_token, refresh_token, expires) VALUES (
                ${userId},
                ${tokens.access_token},
                ${tokens.refresh_token},
                to_timestamp(${(Date.now() / 1000) + tokens.expires_in})
            )
            ON CONFLICT (user_id) DO UPDATE SET
                access_token = EXCLUDED.access_token,
                refresh_token = EXCLUDED.refresh_token,
                expires = EXCLUDED.expires;
        `;

        // Commit transaction
        await client.query("COMMIT");
    }

    catch (error) {
        // Cancel transaction
        await client.query("ROLLBACK");
        console.error("Database insert failed.", error);
        return;
    }

    finally {
        client.release();
    }

    return Response.redirect(config.rootUrl);
};
