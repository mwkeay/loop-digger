"use server";

import { getRawDbAccessToken } from "@/lib/spotify/auth/authorization-code-flow";
import logger from "@/lib/logger";

const apiTest = async (): Promise<Me | undefined> => {

    let accessToken: string;

    // ========================
    //     Get Access Token
    // ========================

    try {
        accessToken = await getRawDbAccessToken();
    }

    catch (error) {
        logger.error("apiTest failed to retrieve access token.", error);
        return;
    }

    // ===============
    //     GET /me
    // ===============

    try {
        const meResponse = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        if (!meResponse.ok) {
            throw new Error("Spotify GET /me failed with status: " + meResponse.status);
        }

        const me: Me = await meResponse.json();

        return me;
    }

    catch (error) {
        logger.error("Spoify GET /me failed.", error);
        return;
    }

};

export default apiTest;
