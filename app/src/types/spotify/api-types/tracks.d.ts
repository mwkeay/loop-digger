type SimplifiedTrack = Omit<Track, "album" | "artists" | "external_ids" | "popularity"> & {
    /** The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist. */
    artists: SimplifiedArtist[]
    /** External URLs for this track. */
    external_urls: {
        /** The {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids Spotify URL} for the object. */
        spotify: string
    }
};

type Track = {
    /** The album on which the track appears. The album object includes a link in `href` to full information about the album. */
    album: TrackAlbum,
    /** The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist. */
    artists: Artist[]
    /** A list of the countries in which the track can be played, identified by their {@link http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2 ISO 3166-1 alpha-2} code. */
    available_markets: string[]
    /** The disc number (usually 1 unless the album consists of more than one disc). */
    disc_number: number
    /** The track length in milliseconds. */
    duration_ms: number
    /** Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown). */
    explicit: boolean
    /** Known external IDs for the track. */
    external_ids: {
        /** The {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids Spotify URL} for the object. */
        spotify: string
    }
    /** A link to the Web API endpoint providing full details of the track. */
    href: string
    id: TrackId
    /** Part of the response when {@link https://developer.spotify.com/documentation/web-api/concepts/track-relinking Track Relinking} is applied. If `true`, the track is playable in the given market. Otherwise `false`. */
    is_playable?: boolean
    /** Part of the response when Track Relinking is applied, and the requested track has been replaced with different track. The track in the linked_from object contains information about the originally requested track. */
    linked_from?: object
    /** Included in the response when a content restriction is applied. */
    restrictions?: {
        /**
         * The reason for the restriction. Supported values:
         * 
         * - `market` - The content item is not available in the given market.
         * - `product` - The content item is not available for the user's subscription type.
         * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
         * 
         * Additional reasons may be added in the future. **Note**: If you use this field, make sure that your application safely handles unknown values.
         */
        reason: "market" | "product" | "explicit" | unknown
    }
    /** The name of the track. */
    name: string
    /**
     * The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.
     * 
     * Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. ***Note**: the popularity value may lag actual popularity by a few days: the value is not updated in real time.*
     */
    popularity: number
    /** A link to a 30 second preview (MP3 format) of the track. Can be `null` */
    preview_url: string | null
    /** The number of the track. If an album has several discs, the track number is the number on the specified disc. */
    track_number: number
    /** The object type. */
    type: "track"
    /** The {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids Spotify URI} for the track. */
    uri: string
    /** Whether or not the track is from a local file. */
    is_local: boolean
};

/**
 * The {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids Spotify ID} for the track.
 * @example "11dFghVXANMlKmJXsNCbNl"
 */
type TrackId = string;

/**
 * A comma-separated list of the {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids Spotify IDs}. Maximum: 100 IDs.
 * @example "7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B"
 */
type TrackIds = string;

type TrackAlbum = Omit<Album, "tracks" | "copyrights" | "external_ids" | "genres" | "label" | "popularity">;

// ======================
//     Audio Analysis
// ======================

type AudioAnalysis = {
    meta: object
    track: object
    /** The time intervals of the bars throughout the track. A bar (or measure) is a segment of time defined as a given number of beats. */
    bars: Bar[]
    /** The time intervals of beats throughout the track. A beat is the basic time unit of a piece of music; for example, each tick of a metronome. Beats are typically multiples of tatums. */
    beats: Beat[]
    /** Sections are defined by large variations in rhythm or timbre, e.g. chorus, verse, bridge, guitar solo, etc. Each section contains its own descriptions of tempo, key, mode, time_signature, and loudness. */
    sections: Section[]
    /** Each segment contains a roughly conisistent sound throughout its duration. */
    segments: Segment[]
    /** A tatum represents the lowest regular pulse train that a listener intuitively infers from the timing of perceived musical events (segments). */
    tatums: Tatum[]
}

type Bar = {
    start: number
    duration: number
    confidence: number
}

type Beat = {
    start: number
    duration: number
    confidence: number
}

type Section = {
    start: number
    duration: number
    confidence: number
    loudness: number
    tempo: number
    temp_confidence: number
    key: number
    key_confidence: number
    mode: number
    mode_confidence: number
    time_signature: number
    time_signature_confidence: number
}

type Segment = {
    start: number
    duration: number
    confidence: number
    loudness_start: number
    loudness_max: number
    loudness_max_time: number
    loudness_end: number
    pitches: number[]
    timber: number[]
}

type Tatum = {
    start: number
    duration: number
    confidence: number
}
