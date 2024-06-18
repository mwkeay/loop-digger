type Artist = {
    /** Known external URLs for this artist. */
    external_urls: {
        /** The {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids Spotify URL} for the object. */
        spotify: string
    }
    /** Information about the followers of the artist. */
    followers: {
        /** This will always be set to null, as the Web API does not support it at the moment. */
        href: null //| string
        /** The total number of followers. */
        total: number
    }
    /**
     * A list of the genres the artist is associated with. If not yet classified, the array is empty.
     * @example ["Prog rock", "Grunge"]
     */
    genres: string[]
    /** A link to the Web API endpoint providing full details of the artist. */
    href: string
    id: ArtistId
    /** Images of the artist in various sizes, widest first. */
    images: Image[]
    /** The name of the artist. */
    name: string
    /** The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks. */
    popularity: number
    /** The object type. */
    type: "artist"
    /** The {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids Spotify URI} for the artist. */
    uri: string
};

/**
 * The {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids Spotify ID} of the artist.
 * @example "0TnOYISbd1XYRBk9myaseg"
 */
type ArtistId = string;

/**
 * A comma-separated list of the {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids Spotify IDs} for the artists. Maximum: 100 IDs.
 * @example "2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6"
 */
type ArtistIds = string;

type SimplifiedArtist = Omit<Artist, "followers" | "genres" | "images" | "popularity">
