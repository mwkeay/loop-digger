// eslint diables are temporary to fix linting issues on development

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

type PlayerEventCallback<T> = T extends "ready" 
    ? (data: { device_id: string }) => void 
    : T extends "not_ready" 
    ? (data: { device_id: string }) => void 
    : T extends "player_state_changed" 
    ? (state: { track_window: { current_track: object; }; paused: boolean; }) => void 
    : never;

/** Initialization options for the Spotify Player. */
interface PlayerInit {

    /** The name of the Spotify Connect player. It will be visible in other Spotify apps */
    name: string;
    /** 
     * This will be called every time you run Spotify.Player#connect or when a user's access token has expired (maximum of 60 minutes). You will be provided with a `callback` parameter. You will need to execute this with a valid `access_token` string for a Spotify Premium user.
     * @param cb - Callback to receive the access token.
     */
    getOAuthToken: (cb: (token: string) => void) => void;
    /** The default volume of the player. Represented as a decimal between 0 and 1. Default value is 1. */
    volume?: number;
    /** 
     * If set to true, the {@link https://www.w3.org/TR/mediasession/| Media Session API} will be set with metadata and action handlers. Default value is false.
     * @see https://developer.spotify.com/documentation/web-playback-sdk/reference#spotifyplayer
     */
    enabledMediaSession?: boolean;
}

/** This is an object that is provided in the {@link https://developer.spotify.com/documentation/web-playback-sdk/reference#ready ready} event as an argument. WebPlaybackPlayer objects contain information related to the current player instance of the Web Playback SDK. */
interface WebPlaybackPlayer {

    device_id: string
}

/** This is an object that is provided every time {@link https://developer.spotify.com/documentation/web-playback-sdk/reference#spotifyplayergetcurrentstate Spotify.Player#getCurrentState} is called. It contains information on context, permissions, playback state, the user’s session, and more. */
interface WebPlaybackState {

    context: PlaybackContext;
    /** A simplified set of restriction controls for the current track. By default, these fields will either be set to false or undefined, which indicates that the particular operation is allowed. When the field is set to `true`, this means that the operation is not permitted. For example, `skipping_next`, `skipping_prev` and `seeking` will be set to `true` when playing an ad track. */
    disallows: PlaybackDisallows;
    /** Whether the current track is paused. */
    paused: boolean;
    /** The position_ms of the current track. */
    position: number;
    /** The repeat mode. No repeat mode is 0, repeat context is 1 and repeat track is 2. */
    repeat_mode: number;
    /** True if shuffled, false otherwise. */
    shuffle: boolean;
    track_window: PlaybackTrackWindow;
}

interface PlaybackContext {

    /** The URI of the context */
    uri: string | null;
    /** Additional metadata for the context */
    metadata: any | null;
}

/** A simplified set of restriction controls for the current track. By default, these fields will either be set to false or undefined, which indicates that the particular operation is allowed. When the field is set to `true`, this means that the operation is not permitted. For example, `skipping_next`, `skipping_prev` and `seeking` will be set to `true` when playing an ad track. */
interface PlaybackDisallows {

    pausing: boolean;
    peeking_next: boolean;
    peeking_prev: boolean;
    resuming: boolean;
    seeking: boolean;
    skipping_next: boolean;
    skipping_prev: boolean;
}

interface PlaybackTrackWindow {

    /** The track currently on local playback */
    current_track: WebPlaybackTrack;
    /** Previously played tracks. Number can vary. */
    previous_tracks: WebPlaybackTrack[];
    /** Tracks queued next. Number can vary. */
    next_tracks: WebPlaybackTrack[];
}

/** This is an object that is provided inside `track_window` from the {@link https://developer.spotify.com/documentation/web-playback-sdk/reference#webplaybackstate-object WebPlaybackState Object}. Track objects are {@link https://developer.spotify.com/documentation/web-api Spotify Web API} compatible objects containing metadata on Spotify content. */
interface WebPlaybackTrack {

    /** Spotify URI */
    uri: string;
    /** Spotify ID from URI */
    id: string | null;
    /** Content type: can be "track", "episode" or "ad */
    type: "track" | "episode" | "ad";
    /** Type of file: can be "audio" or "video" */
    media_type: "audio" | "video";
    /** Name of content */
    name: string;
    /** Flag indicating whether it can be played */
    is_playable: boolean;
    album: {
        /** Spotify Album URI */
        uri: string;
        name: string;
        images: Image[];
    };
    artists: [{ uri: string; name: string }];
}

/**
 * This is an object that is provided in all error handlers from the Web Playback SDK.
 * 
 * - `initialization_error` Emitted when the `Spotify.Player` fails to instantiate a player capable of playing content in the current environment. Most likely due to the browser not supporting EME protection.
 * - `authentication_error` Emitted when the `Spotify.Player` fails to instantiate a valid Spotify connection from the access token provided to `getOAuthToken`. 
 * - `account_error` Emitted when the user authenticated does not have a valid Spotify Premium subscription.
 * - `playback_error` Emitted when loading and/or playing back a track failed.
 * 
 * It is referred to as e and looks like this:
 * @example
 * player.on('initialization_error', ({ message }) => {
 *     console.error('Failed to initialize', message);
 * });
 * // { message: "This will contain a message explaining the error." }
 */
interface WebPlaybackError {

    message: string;
}
