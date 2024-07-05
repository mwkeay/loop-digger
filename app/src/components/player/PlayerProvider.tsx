"use client";

import logger from "@/lib/logger";
import { getRawDbAccessToken } from "@/lib/spotify/auth/authorization-code-flow";
import addPlayerEventListeners from "@/lib/spotify/player/addPlayerEventListeners";
import { PlayerContext, PlayerContextObject, initPlayerContext } from "@/lib/spotify/player/context";
import createSpotifyPlayer from "@/lib/spotify/player/createSpotifyPlayer";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";

const PlayerProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [context, setContext] = useState<PlayerContextObject>(initPlayerContext);

    // ===============
    //     Timeout
    // ===============

    const setPlayerTimeout = useCallback((callback: () => void, ms: number) => setContext(prev => {
        if (prev.timeout) clearTimeout(prev.timeout);
        const timeout = setTimeout(callback, ms);
        return { ...prev, timeout };
    }), [setContext]);

    const clearPlayerTimeout = useCallback(() => setContext(prev => {
        if (prev.timeout) clearTimeout(prev.timeout);
        return { ...prev, timeout: null };
    }), [setContext]);

    // ======================
    //     Volume Control
    // ======================

    const setVolume = useCallback((volume: number) => {

        if (volume < 0 || volume > 1) {
            logger.error(`Attempted to set volume outside of range (passed ${ volume }.`);
            return;
        }

        if (context.player?.setVolume && context.isActive) {
            context.player.setVolume(volume)
                .then(() => logger.debug(`Set WebSDKPlayer volume to ${ volume * 100 }%`))
                .catch(error => logger.error("Error setting WebPlaybackSDK volume:", error));
        }

        setContext(prev => ({ ...prev, volume }));
        logger.debug(`Set web player context volume to ${ volume * 100 }%`);
    }, [context.isActive, context.player]);

    // Updates the context's setVolume function
    useEffect(() => setContext(prev => ({ ...prev, setVolume})), [setVolume]);

    // ====================
    //     Player Setup
    // ====================

    useEffect(() => {

        const tokenCallback = async () => {
            try {
                const accessToken = await getRawDbAccessToken();
                logger.info("SpotifyPlayer authentication refreshed.");
                return accessToken;
            }
            catch (error) {
                return null;
            }
        };

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = createSpotifyPlayer(tokenCallback);

            if (!player) {
                logger.error("Failed to create SpotifyPlayer instance.");
                return;
            }

            addPlayerEventListeners(player, setContext);
            setContext(prev => ({ ...prev, player: player  }));
            logger.info("Created SpotifyPlayer instance.");

            player.connect().catch((error: WebPlaybackError) => {
                setContext(prev => ({ ...prev, error }));
                logger.error("Failed to connect web player.", error);
            });
        };

    }, []);

    // =======================
    //     Render Provider
    // =======================

    const passedContext = {
        ...context,
        setPlayerTimeout,
        clearPlayerTimeout,
    }

    return (
        <PlayerContext.Provider value={passedContext}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerProvider;
