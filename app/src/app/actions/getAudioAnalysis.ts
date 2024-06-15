"use server";

import { AudioAnalysis } from "@/types/spotify/tracks";
import { getCCToken } from "../lib/spotify/auth/client-credentials-flow";

const getAudioAnalysis = async (trackId: string): Promise<AudioAnalysis | undefined> => {

    const ccToken = await getCCToken();

    if (!ccToken) {
        console.error("Server action getCCToken failed in getAudioAnalysis.");
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

        console.log("Spotify GET /audio-analysis/ 200");

        return audioAnalysis;
    }

    catch (error) {
        console.error("Spotify GET /audio-analysis/ failed.", error);
        return;
    }
};

export default getAudioAnalysis;
