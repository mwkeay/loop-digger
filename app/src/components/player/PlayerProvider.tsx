"use client";

import logger from "@/lib/logger";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import createSpotifyPlayer from "@/lib/spotify/player/createSpotifyPlayer";
import startPlayback from "@/app/actions/startPlayback";
import { getRawDbAccessToken } from "@/lib/spotify/auth/authorization-code-flow";
import { EditorContextSample } from "@/lib/editor/context";
import { PlayerContext, PlayerContextObject, TimedAction, initPlayerContext, nullPlayerContext } from "@/lib/spotify/player/context";
import { SpotifyPlayer } from "@/types/spotify/SpotifyPlayer";

const PlayerProvider: FC<{ children: ReactNode }> = ({ children }) => {

    // =============
    //     State
    // =============

    // Context
    const [context, setContext] = useState<PlayerContextObject>(initPlayerContext);

    // Self managed player states
    const [positionMs, setPositionMs] = useState<number | null>(initPlayerContext.positionMs);
    const [state, setState] = useState<WebPlaybackState | null>(initPlayerContext.state); // state refers to Spotify.Player.state

    const [timedAction, setTimedAction] = useState<TimedAction | null>(null)

    // ===============
    //     Timings
    // ===============

    // Recursive hook to update position and call timed actions
    useEffect(() => {
        let frameId: number;
        // Recursive state function
        const checkPosition = async () => {
            const state = await context.player?.getCurrentState();
            // Check if player active
            if (state === undefined) {
                setPositionMs(null);
                setTimedAction(null);
                return;
            }
            // Set position
            if (!state) {
                setPositionMs(null);
                setTimedAction(null);
            }
            else {
                setPositionMs(state.position);
                // If timed action waiting
                if (timedAction?.callback && state.position >= timedAction.positionMs) {
                    timedAction.callback();
                    setTimedAction(null);
                    return;
                }
            }
            // Delay
            await new Promise(resolve => setTimeout(resolve, 10));
            // Continue recursion
            frameId = requestAnimationFrame(checkPosition);
        }
        // Start recursion
        frameId = requestAnimationFrame(checkPosition);
        // Cleanup function
        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [context.isActive, timedAction]);

    // ===================
    //     Play Sample
    // ===================

    const playSample = async (sample: EditorContextSample) => {

        // Check for valid sample
        if (!sample.track || !sample.startMs || !sample.durationMs) {
            logger.error("Player: sample passed to playSample contains undefined key values.");
            return;
        }
        // Check for valid player
        if (!context.isActive || !context.player) {
            logger.error("Player: playSample called on inactive player.");
            return;
        }
        // Start sample track
        if (sample.track.id != context.currentTrack?.id) await startPlayback(sample.track.id, sample.startMs);
        await context.player.seek(sample.startMs);
        await context.player.resume();

        // Scheduled action
        const timedAction: TimedAction = {
            callback: () => {
                if (!context.player) return logger.error("!context.player");
                context.player.pause();
            },
            positionMs: sample.startMs + sample.durationMs
        }
        setTimedAction(timedAction);
    };

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

    // ============================
    //     Player Initalization
    // ============================

    useEffect(() => {

        // ============================
        //     Player Token Request
        // ============================
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

        // =======================
        //     Event Listeners
        // =======================
        const addListeners = (player: SpotifyPlayer) => {
            // Account Error
            player.addListener("account_error", (error: WebPlaybackError) => {
                setContext((prev): PlayerContextObject => ({ ...prev, error }));
                logger.error("WebPlayerSDK instance failed to validate Spotify account", error);
            });
            // Authentication Error
            player.addListener("authentication_error", (error: WebPlaybackError) => {
                setContext((prev): PlayerContextObject => ({ ...prev, error}));
                logger.error("WebPlayerSDK instance failed to authenticate", error);
            });
            // Initialization Error
            player.addListener("initialization_error", (error: WebPlaybackError) => {
                setContext((prev): PlayerContextObject => ({ ...prev, error}));
                logger.error("WebPlayerSDK instance failed to initialize", error);
            });
            // Not Ready
            player.addListener("not_ready", ({ device_id }: { device_id: string }) => {
                setContext(prev => ({
                    ...prev,
                    ...nullPlayerContext, // is this right?
                    deviceId: device_id,
                }));
                logger.info("Web Player offline.");
            });
            // Playback Error
            player.addListener("playback_error", (unk: unknown) => {
                console.error("Failed to perform playback", unk);
            });
            // Player State Changed
            player.addListener("player_state_changed", (state: WebPlaybackState | null) => {
                // Player inactive (track_window.current_track is null when player is inactive)
                if (!state?.track_window.current_track) {
                    setContext((prev): PlayerContextObject => ({
                        ...prev,
                        isActive: false,
                        currentTrack: null,
                    }));
                    setState(state);
                    return;
                }
                // Player active
                setContext((prev): PlayerContextObject => ({
                    ...prev,
                    isActive: true,
                    currentTrack: state.track_window.current_track,
                }));
                setState(state);
            });
            // Ready
            player.addListener("ready", ({ device_id }: { device_id: string }) => {
                setContext((prev): PlayerContextObject => ({
                    ...prev,
                    player,
                    deviceId: device_id,
                    isReady: true,
                }));
                logger.info("Web player ready.");
            });
        };

        // ============================
        //     Creation on SDK Load
        // ============================
        window.onSpotifyWebPlaybackSDKReady = () => {
            // Create Spotify Player instance
            const player = createSpotifyPlayer(tokenCallback);
            if (!player) {
                logger.error("Failed to create SpotifyPlayer instance.");
                return;
            }
            // Add player event listeners
            addListeners(player);
            // Add player to context
            setContext(prev => ({ ...prev, player  }));
            // Connect
            player.connect().catch((error: WebPlaybackError) => {
                setContext(prev => ({ ...prev, error }));
                logger.error("Failed to connect web player.", error);
            });
        };
    }, []);

    // ==============
    //     Render
    // ==============

    const passedContext: PlayerContextObject = {
        ...context,
        positionMs,
        state,
        setVolume,
        timedAction,
        setTimedAction,
        playSample,
    }

    return (
        <PlayerContext.Provider value={passedContext}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerProvider;
