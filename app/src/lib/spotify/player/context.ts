import { EditorContextSample } from "@/lib/editor/context";
import logger from "@/lib/logger";
import { SpotifyPlayer } from "@/types/spotify/SpotifyPlayer";
import { createContext, useContext } from "react";

export interface TimedAction {
    callback: () => void
    positionMs: number
}

export interface PlayerContextObject {

    // Core
    currentTrack: WebPlaybackTrack | null
    deviceId: string | null
    error: WebPlaybackError | null
    isActive: boolean
    isReady: boolean
    muted: boolean
    player: SpotifyPlayer | null

    // Core (self managed)
    positionMs: number | null
    state: WebPlaybackState | null
    volume: number
    setVolume: (volume: number) => void

    // Functions
    playSample: (sample: EditorContextSample) => Promise<void>

    // Timed Action
    timedAction: TimedAction | null
    setTimedAction: (timedAction: TimedAction) => void
}

export const initPlayerContext: PlayerContextObject = {

    // Core
    currentTrack: null,
    deviceId: null,
    error: null,
    isActive: false,
    isReady: false,
    muted: false,
    player: null,

    // Core (self managed)
    positionMs: null,
    state: null,
    volume: 0.5,
    setVolume: () => logger.error("Called setVolume outside of a WebPlayerProvider wrapper."),

    // Functions (pre-initalisation warnings)
    playSample: async () => logger.error("Called playSample outside of a WebPlayerProvider wrapper."),

    // Timed Action
    timedAction: null,
    setTimedAction: () => logger.error("Called setTimedAction outside of a WebPlayerProvider wrapper."),
};

export const nullPlayerContext = {
    // Core
    currentTrack: null,
    deviceId: null,
    error: null,
    isActive: false,
    isReady: false,
    player: null,

    // Core (self managed)
    position: null,
    state: null,

    // Timed Action
    timedAction: null,
};

export const PlayerContext = createContext<PlayerContextObject>(initPlayerContext);

export const usePlayer = () => useContext(PlayerContext);
