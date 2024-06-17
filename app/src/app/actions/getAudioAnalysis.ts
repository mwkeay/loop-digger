"use server";

import { AudioAnalysis } from "@/types/spotify/api-types/tracks";
import { getCCToken } from "@/lib/spotify/auth/client-credentials-flow";
import logger from "@/lib/logger";

const getAudioAnalysis = async (trackId: string): Promise<AudioAnalysis | undefined> => {

    const ccToken = await getCCToken();

    if (!ccToken) {
        logger.error("Server action getCCToken failed in getAudioAnalysis.");
        return;
    }

    const accessToken = ccToken.accessToken;

    try {
        const response = await fetch("https://api.spotify.com/v1/audio-analysis/" + trackId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        if (!response.ok) {
            throw new Error("Spotify GET /audio-analysis/ failed with status: " + response.status);
        }

        const audioAnalysis: AudioAnalysis = await response.json();

        logger.debug("Spotify GET /audio-analysis/ 200");

        return audioAnalysis;
    }

    catch (error) {
        logger.error("Spotify GET /audio-analysis/ failed.", error);
        return;
    }
};

export default getAudioAnalysis;
