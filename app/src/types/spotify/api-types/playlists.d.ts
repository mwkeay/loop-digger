type Playlist = {
    collaborative: boolean;
    description: string | null;
    external_urls: {
        spotify: string
    };
    /** Information about the followers of the playlist. */
    followers: {
        /** This will always be set to null, as the Web API does not support it at the moment. */
        href: null
        /** The total number of followers. */
        total: number
    };
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: User;
    public: boolean | null;
    snapshot_id: string;
    tracks: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: PlaylistTrack[];
    };
    type: "playlist";
    uri: string;
};

type PlaylistTrack = {
    /** The date and time the track or episode was added. Note: some very old playlists may return null in this field. */
    added_at: string | null
    /** The Spotify user who added the track or episode. Note: some very old playlists may return null in this field. */
    added_by: User | null
    /** Whether this track or episode is a local file or not. */
    is_local: boolean
    /** Information about the track or episode. */
    track: Track | Episode
}
