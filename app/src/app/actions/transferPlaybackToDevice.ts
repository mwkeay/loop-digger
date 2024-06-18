"use server";

import logger from "@/lib/logger";
import { getRawDbAccessToken } from "@/lib/spotify/auth/authorization-code-flow";

const transferPlaybackToDevice = async (deviceId: string) => {

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
        const response = await fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            body: JSON.stringify({ device_ids: [deviceId], play: true }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        });
  
        if (response.ok) {
            logger.debug("Playback successfully transferred to device with ID:", deviceId);
        } else {
            logger.error("Failed to transfer playback. Response status:", response.status);
        }
    }
    
    catch (error) {
        console.error("Error transferring playback to device:", error);
    }
};

export default transferPlaybackToDevice;
