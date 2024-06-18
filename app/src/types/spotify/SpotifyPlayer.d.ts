/* eslint-disable @typescript-eslint/ban-types */

// Extend the global Window object to define the class and listener created by the Spotify Web Playback SDK.
declare global {

    interface Window {

        onSpotifyWebPlaybackSDKReady: () => void

        Spotify: {
            Player: typeof SpotifyPlayer
        }
    }
}

/**
 * The main constructor for initializing the Web Playback SDK. It should contain an object with the player name, volume, and access token.
 * @example 
 * window.onSpotifyWebPlaybackSDKReady = () => {
 *     const token = '[My Spotify Web API access token]';
 *     const player = new Spotify.Player({
 *         name: 'Web Playback SDK Quick Start Player',
 *         getOAuthToken: cb => { cb(token); }
 *     });
 * }
 * @see https://developer.spotify.com/documentation/web-playback-sdk/reference#spotifyplayer
 */
export declare class SpotifyPlayer {

    /**
     * @param {string} name The name of the Spotify Connect player. It will be visible in other Spotify apps 
     * @param {Function} getOAuthToken This will be called every time you run Spotify.Player#connect or when a user's access token has expired (maximum of 60 minutes). You will be provided with a `callback` parameter. You will need to execute this with a valid `access_token` string for a Spotify Premium user.
     * @param {number} volume The default volume of the player. Represented as a decimal between 0 and 1. Default value is 1.
     * @param {boolean} enabledMediaSession If set to true, the {@link https://www.w3.org/TR/mediasession/ Media Session API} will be set with metadata and action handlers. Default value is false.
     */
    constructor(options: PlayerInit);

    /**
     * Connect our Web Playback SDK instance to Spotify with the credentials provided during initialization.
     * @returns {boolean} Returns a `Promise` containing a `Boolean` (either `true` or `false`) with the success of the connection.
     */
    connect(): Promise<boolean>;

    /**
     * Closes the current session our Web Playback SDK has with Spotify.
     */
    disconnect(): void;

    /**
     * Create a new event listener in the Web Playback SDK. Alias for Spotify.Player#on.
     * @param event_name A valid event name. See Web Playback SDK Events.
     * @param callback A callback function to be fired when the event has been executed.
     * @returns Returns a Boolean. Returns true if the event listener for the event_name is unique. See {@link https://developer.spotify.com/documentation/web-playback-sdk/reference#spotifyplayerremovelistener #removeListener} for removing existing listeners.
     */
    addListener(event_name: string, callback: Function): boolean;

    /**
     * Remove an event listener in the Web Playback SDK.
     * @param event_name A valid event name. See Web Playback SDK Events.
     * @param callback The callback function you would like to remove from the listener. If not provided, it will remove all callbacks under the event_name.
     * @returns Returns a Boolean. Returns true if the event name is valid with registered callbacks from #addListener.
     */
    removeListener(event_name: string, callback?: Function): boolean;

    /**
     * Collect metadata on local playback.
     * @returns Returns a Promise. It will return either a WebPlaybackState object or null depending on if the user is successfully connected.
     */
    getCurrentState(): Promise<WebPlaybackState | null>;

    /**
     * Rename the Spotify Player device. This is visible across all Spotify Connect devices.
     * @param name The new desired player name.
     * @returns Returns a Promise.
     */
    setName(name: string): Promise<void>;

    /**
     * Get the local volume currently set in the Web Playback SDK.
     * @returns Returns a Promise containing the local volume (as a Float between 0 and 1).
     */
    getVolume(): Promise<number>;

    /**
     * Set the local volume for the Web Playback SDK.
     * @param volume The new desired volume for local playback. Between 0 and 1.
     * @returns Returns an empty Promise
     */
    setVolume(volume: number): Promise<void>;

    /**
     * Pause the local playback.
     * @returns Returns an empty Promise
     */
    pause(): Promise<void>;

    /**
     * Resume the local playback.
     * @returns Returns an empty Promise
     */
    resume(): Promise<void>;

    /**
     * Resume/pause the local playback.
     * @returns Returns an empty Promise
     */
    togglePlay(): Promise<void>;

    /**
     * Seek to a position in the current track in local playback.
     * @param position_ms The position in milliseconds to seek to.
     * @returns Returns an empty Promise
     */
    seek(position_ms: number): Promise<void>;

    /**
     * Switch to the previous track in local playback.
     * @returns Returns an empty Promise
     */
    previousTrack(): Promise<void>;

    /**
     * Skip to the next track in local playback.
     * @returns Returns an empty Promise
     */
    nextTrack(): Promise<void>;

    /**
     * Activate the player in certain browsers to allow playback without further user interaction.
     * @returns Returns an empty Promise
     */
    activateElement(): Promise<void>;
}
