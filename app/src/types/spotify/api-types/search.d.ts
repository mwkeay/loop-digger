type Search = {
    tracks: SearchCategory & { items: track[] }
    artists: SearchCategory & { items: artist[] }
    albums: SearchCategory & { items: album[] }
    playlists: SearchCategory & { items: object[] }
    shows: SearchCategory & { items: object[] }
    epsiodes: SearchCategory & { items: object[] }
    audiobooks: SearchCategory & { items: object[] }
}

type SearchCategory = {
    /**
     * A link to the Web API endpoint returning the full result of the request
     * @example
     * "https://api.spotify.com/v1/me/shows?offset=0&limit=20"
     */
    href: string
    /** The maximum number of items in the response (as set in the query or by default). */
    limit: number
    /**
     * URL to the next page of items. (null if none)
     * @example
     * "https://api.spotify.com/v1/me/shows?offset=1&limit=1"
     */
    next: string | null
    /** The offset of the items returned (as set in the query or by default) */
    offset: number
    /**
     * URL to the previous page of items. ( null if none)
     * @example
     * "https://api.spotify.com/v1/me/shows?offset=1&limit=1"
     */
    previous: string | null
    /** The total number of items available to return. */
    total: number
    items: track[] | artist[] | album[] | object[]
}
