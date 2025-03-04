import { Market } from "@/types/spotify/common"

type SearchMap = {

    "/search": {
        method: "GET"
        params: {
            q: SearchQuery
            /**
             * A comma-separated list of item types to search across. Search results include hits from all the specified item types. For example: q=abacab&type=album,track returns both albums and tracks matching "abacab".
             * 
             * Allowed values: "album", "artist", "playlist", "track", "show", "episode", "audiobook"
             */
            type: string
            market?: Market
            /**
             * The maximum number of results to return in each item type.
             * 
             * Default: `limit=20`
             * 
             * Range: `0` - `50`
             */
            limit?: number
            /**
             * The index of the first result to return. Use with limit to get the next page of search results.
             * 
             * Default: `offset=0`
             * Range: `0` - `1000`
             */
            offset?: number
            /** If `include_external=audio` is specified it signals that the client can play externally hosted audio content, and marks the content as playable in the response. By default externally hosted audio content is marked as unplayable in the response. */
            include_external?: "audio"
        }
        responseData: Search
    }

}

/**
 * Your search query.
 * 
 * You can narrow down your search using field filters. The available filters are album, artist, track, year, upc, tag:hipster, tag:new, isrc, and genre. Each field filter only applies to certain result types.
 * 
 * - The artist and year filters can be used while searching albums, artists and tracks. You can filter on a single year or a range (e.g. 1955-1960).
 * - The album filter can be used while searching albums and tracks.
 * - The genre filter can be used while searching artists and tracks.
 * - The isrc and track filters can be used while searching tracks.
 * - The upc, tag:new and tag:hipster filters can only be used while searching albums. The tag:new filter will return albums released in the past two weeks and tag:hipster can be used to return only albums with the lowest 10% popularity.
 * 
 * @example
 * "remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis"
 */
type SearchQuery = string

/**
 * A comma-separated list of item types to search across. Search results include hits from all the specified item types. For example: q=abacab&type=album,track returns both albums and tracks matching "abacab".
 * 
 * Allowed values: "album", "artist", "playlist", "track", "show", "episode", "audiobook"
 */
type SearchTypeSet = Set<SearchType>

type SearchType = "album" | "artist" | "playlist" | "track" | "show" | "episode" | "audiobook"
