"use server";

import { Track } from "@/types/spotify/api-types/tracks";
import { getCCToken } from "@/lib/spotify/auth/client-credentials-flow";
import logger from "@/lib/logger";

const getTrack = async (trackId: string): Promise<Track | undefined> => {

    const ccToken = await getCCToken();

    if (!ccToken) {
        logger.error("Server action getCCToken failed in getTrack.");
        return;
    }

    const accessToken = ccToken.accessToken;

    try {
        const response = await fetch("https://api.spotify.com/v1/tracks/" + trackId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        if (!response.ok) {
            throw new Error("Spotify GET /track/ failed with status: " + response.status);
        }

        const track: Track = await response.json();

        logger.debug("Spotify GET /track/ 200");

        return track;
    }

    catch (error) {
        logger.error("Spotify GET /track/ failed.", error);
        return;
    }
};

export default getTrack;
