import { Dispatch, SetStateAction } from "react";
import { PlayerContextObject, nullPlayerContext } from "./context";
import logger from "@/lib/logger";
import { SpotifyPlayer } from "@/types/spotify/SpotifyPlayer";

const addPlayerEventListeners = (player: SpotifyPlayer, setContext: Dispatch<SetStateAction<PlayerContextObject>>) => {

    // =====================
    //     Account Error
    // =====================

    player.addListener("account_error", (error: WebPlaybackError) => {
        setContext((prev): PlayerContextObject => ({ ...prev, error }));
        logger.error("WebPlayerSDK instance failed to validate Spotify account", error);
    });

    // ============================
    //     Authentication Error
    // ============================

    player.addListener("authentication_error", (error: WebPlaybackError) => {
        setContext((prev): PlayerContextObject => ({ ...prev, error}));
        logger.error("WebPlayerSDK instance failed to authenticate", error);
    });

    // ============================
    //     Initialization Error
    // ============================

    player.addListener("initialization_error", (error: WebPlaybackError) => {
        setContext((prev): PlayerContextObject => ({ ...prev, error}));
        logger.error("WebPlayerSDK instance failed to initialize", error);
    });

    // =================
    //     Not Ready
    // =================

    player.addListener("not_ready", ({ device_id }: { device_id: string }) => {

        setContext((prev): PlayerContextObject => ({
            ...prev,
            ...nullPlayerContext,
            deviceId: device_id,
        }));

        logger.info("Web Player offline.");
    });

    // ======================
    //     Playback Error
    // ======================

    player.addListener("playback_error", (unk: unknown) => {
        console.error("Failed to perform playback", unk);
    });

    // ============================
    //     Player State Changed
    // ============================

    player.addListener("player_state_changed", (state: WebPlaybackState | null) => {

        // Player inactive (track_window.current_track is null when player is inactive)
        if (!state?.track_window.current_track) {

            setContext((prev): PlayerContextObject => ({
                ...prev,
                isActive: false,
                state,
                currentTrack: null,
            }));
            return;
        }

        // Player active
        setContext((prev): PlayerContextObject => ({
            ...prev,
            isActive: true,
            state,
            currentTrack: state.track_window.current_track,
        }));
    });

    // =============
    //     Ready
    // =============

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

export default addPlayerEventListeners;
