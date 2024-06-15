"use server";

import { Track } from "@/types/spotify/tracks";
import { getCCToken } from "../lib/spotify/auth/client-credentials-flow";

const getTrack = async (trackId: string): Promise<Track | undefined> => {

    const ccToken = await getCCToken();

    if (!ccToken) {
        console.error("Server action getCCToken failed in getTrack.");
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
            throw new Error("Spotify GET /track/{id} failed with status: " + response.status);
        }

        const track: Track = await response.json();

        console.log("Spotify GET /track/ 200");

        return track;
    }

    catch (error) {
        console.error("Spotify GET /track/{id} failed.", error);
        return;
    }
};

export default getTrack;
