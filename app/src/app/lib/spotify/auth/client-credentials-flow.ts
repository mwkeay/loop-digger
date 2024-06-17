"use server";

import * as logger from "@/app/lib/logger";
import spotifyConfig from "@/app/lib/spotify/config";

interface CCTokenResponse {
    access_token: string
    token_type: "Bearer"
    expires_in: 3600
}

interface CCToken {
    accessToken: string
    expires: Date
}

let token: CCToken;

export const getNewCCToken = async (): Promise<CCToken | undefined> => {

    try {
        const startTime = Date.now();
        
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: spotifyConfig.clientId,
                client_secret: spotifyConfig.clientSecret,
            }),
        });

        const data: CCTokenResponse = await response.json();

        if (!data.access_token) throw new Error("No access_token attribute in Spotify client credentials token response JSON.");
        if (!data.expires_in) throw new Error("No expires_in attribute in Spotify client credentials token response JSON.");
        if (data.expires_in != 3600) logger.error("Unexpected expires_in length in Spotify client credentials token response JSON.");

        const newToken = {
            accessToken: data.access_token,
            expires: new Date(startTime + (data.expires_in * 1000)),
        };

        token = newToken;

        logger.info("Client credentials token updated.", {
            accessToken: newToken.accessToken,
            expires: newToken.expires.toString(),
        });
        
        return newToken;
    }

    catch (error) {
        logger.error("Access token fetch failed.", error);
        return;
    }
};

export const getCCToken = async (): Promise<CCToken | undefined> => {

    if (token?.accessToken && token.expires > new Date()) return token;
    
    return await getNewCCToken();
};
