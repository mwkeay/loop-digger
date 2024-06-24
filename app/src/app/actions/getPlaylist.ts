"use server";

import { getCCToken } from "@/lib/spotify/auth/client-credentials-flow";
import logger from "@/lib/logger";

const getPlaylist = async (playlistId: string): Promise<Playlist | undefined> => {

    const ccToken = await getCCToken();

    if (!ccToken) {
        logger.error("Server action getCCToken failed in getPlaylist.");
        return;
    }

    const accessToken = ccToken.accessToken;

    try {
        const response = await fetch("https://api.spotify.com/v1/playlists/" + playlistId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        if (!response.ok) {
            throw new Error("Spotify GET /playlist/ failed with status: " + response.status);
        }

        const playlist: Playlist = await response.json();

        logger.debug("Spotify GET /playlist/ 200");

        return playlist;
    }

    catch (error) {
        logger.error("Spotify GET /playlist/ failed.", error);
        return;
    }
};

export default getPlaylist;
