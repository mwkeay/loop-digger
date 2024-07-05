"use server";

import logger from "@/lib/logger";
import { getRawDbAccessToken } from "@/lib/spotify/auth/authorization-code-flow";

const transferPlaybackToDevice = async (trackId: string, positionMs?: number) => {

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

    // =========================
    //     Transfer Playback
    // =========================

    try {
        const response = await fetch("https://api.spotify.com/v1/me/player/play", {
            method: "PUT",
            body: JSON.stringify({ uris: ["spotify:track:" + trackId], position_ms: positionMs ?? 0 }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        });
  
        if (response.ok) {
            logger.debug("Playback successfully started with track ID:", trackId);
        } else {
            logger.error("Failed to start playback. Response status:", response.status);
        }
    }
    
    catch (error) {
        console.error("Error starting playback:", error);
    }
};

export default transferPlaybackToDevice;
