import logger from "@/lib/logger";
import { SpotifyPlayer } from "@/types/spotify/SpotifyPlayer";
import { createContext, useContext } from "react";

export interface PlayerContextObject {
    currentTrack: WebPlaybackTrack | null
    deviceId: string | null
    error: WebPlaybackError | null
    isActive: boolean
    isReady: boolean
    muted: boolean
    player: SpotifyPlayer | null
    setVolume: (volume: number) => void
    state: WebPlaybackState | null
    volume: number
    // Timeout
    timeout: NodeJS.Timeout | null
    setPlayerTimeout: (callback: () => void, ms: number) => void
    clearPlayerTimeout: () => void
}

export const initPlayerContext: PlayerContextObject = {
    currentTrack: null,
    deviceId: null,
    error: null,
    isActive: false,
    isReady: false,
    muted: false,
    player: null,
    setVolume: () => logger.error("Called setVolume outside of a WebPlayerProvider wrapper."),
    state: null,
    volume: 0.5,
    timeout: null,
    setPlayerTimeout: () => logger.error("Called setPlayerTimeout outside of a WebPlayerProvider wrapper."),
    clearPlayerTimeout: () => logger.error("Called clearPlayerTimeout outside of a WebPlayerProvider wrapper."),
};

export const nullPlayerContext = {
    currentTrack: null,
    deviceId: null,
    error: null,
    isActive: false,
    isReady: false,
    player: null,
    state: null,
    timeout: null
};

export const PlayerContext = createContext<PlayerContextObject>(initPlayerContext);

export const usePlayer = () => useContext(PlayerContext);
