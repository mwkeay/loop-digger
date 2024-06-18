"use client";

import logger from "@/lib/logger";
import { SpotifyPlayer } from "@/types/spotify/SpotifyPlayer";

const createSpotifyPlayer = (tokenCallback: () => Promise<string>, initVolume: number = 0.5): SpotifyPlayer | undefined => {

    try {
        const options: PlayerInit = {
            name: "LoopDigger Spotify Web Player",
            getOAuthToken: cb => tokenCallback().then(accessToken => cb(accessToken)),
            volume: initVolume,
        };

        const player: SpotifyPlayer = new window.Spotify.Player(options);
        logger.debug("Created SpotifyPlayer instance.", options);

        return player;
    }

    catch (error) {
        logger.error("Failed to create SpotifyPlayer instance.", error);
        return;
    }
};

export default createSpotifyPlayer;
