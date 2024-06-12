export type CopyrightObject = {
    /** The copyright text for this content. */
    text: string
    /**
     * The type of copyright.
     * 
     * - `"C"` - the copyright.
     * - `"P"` - the sound recording (performance) copyright.
     */
    type: "C" | "P"
}

export type Album = {
    /** The type of the album. */
    album_type: "album" | "single" | "compilation"
    /** The number of tracks in the album. */
    total_tracks: number
    /**
     * The markets in which the album is available: ISO 3166-1 alpha-2 country codes. NOTE: an album is considered available in a market when at least 1 of its tracks is available in that market.
     * @example ["CA","BR","IT"]
     */
    available_markets: string[]
    /** Known external URLs for this album. */
    external_urls: {
        /** The {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids Spotify URL} for the object. */
        spotify: string
    }
    /** A link to the Web API endpoint providing full details of the album. */
    href: string
    id: AlbumId
    /** The cover art for the album in various sizes, widest first. */
    images: Image[]
    /** The name of the album. In case of an album takedown, the value may be an empty string. */
    name: string
    /**
     * The date the album was first released.
     * @example "1981-12"
     */
    release_date: string
    /** The precision with which release_date value is known. */
    release_date_precision: "year" | "month" | "day"
    /** Included in the response when a content restriction is applied. */
    restrictions?: object // UNCERTAIN
    /** The object type. */
    type: "album"
    /**
     * The Spotify URI for the album.
     * @example "spotify:album:2up3OPMp9Tb4dAKM2erWXQ"
     */
    uri: string
    /** The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist. */
    artists: SimplifiedArtist[]
    /** The tracks of the album. */
    tracks: {
        /**
         * A link to the Web API endpoint returning the full result of the request
         * @example "https://api.spotify.com/v1/me/shows?offset=0&limit=20"
         */
        href: string
        /** The maximum number of items in the response (as set in the query or by default). */
        limit: number
        /**
         * URL to the next page of items (`null` if none).
         * @example "https://api.spotify.com/v1/me/shows?offset=1&limit=1"
         */
        next: string | null
        /** The offset of the items returned (as set in the query or by default) */
        offset: number
        /**
         * URL to the previous page of items (`null` if none).
         * @example "https://api.spotify.com/v1/me/shows?offset=1&limit=1"
         */
        previous: string | null
        /** The total number of items available to return. */
        total: number
        items: SimplifiedTrack[]
    }
    /** The copyright statements of the album. */
    copyrights: CopyrightObject[]
    /** Known external IDs for the album. */
    external_ids: {
        /** {@link http://en.wikipedia.org/wiki/International_Standard_Recording_Code International Standard Recording Code} */
        isrc: string
        /** {@link http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29 International Article Number} */
        ean: string
        /** {@link http://en.wikipedia.org/wiki/Universal_Product_Code Universal Product Code} */
        upc: string
    }
    /** A list of the genres the album is associated with. If not yet classified, the array is empty. */
    genres: string[]
    /** The label associated with the album. */
    label: string
    /** The popularity of the album. The value will be between 0 and 100, with 100 being the most popular. */
    popularity: number
};

/**
 * The {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids Spotify IDs} of the album.
 * @example "4aawyAB9vmqN3uQ7FjRGTy"
 */
type AlbumId = string;

/**
 * A comma-separated list of the {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids Spotify IDs} for the albums. Maximum: 20 IDs.
 * @example "382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc"
 */
type AlbumIds = string;
