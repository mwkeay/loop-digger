export type PlaylistsMap = {

    "/playlists/{playlist_id}": {
        method: "GET"
        params: {
            /** The Spotify ID of the playlist. */
            playlist_id: string
            market?: Market
            /**
             * Filters for the query: a comma-separated list of the fields to return. If omitted, all fields are returned. For example, to get just the playlist''s description and URI: fields=description,uri. A dot separator can be used to specify non-reoccurring fields, while parentheses can be used to specify reoccurring fields within objects. For example, to get just the added date and user ID of the adder: fields=tracks.items(added_at,added_by.id). Use multiple parentheses to drill down into nested objects, for example: fields=tracks.items(track(name,href,album(name,href))). Fields can be excluded by prefixing them with an exclamation mark, for example: fields=tracks.items(track(name,href,album(!name,href)))
             * @example
             * "fields=items(added_by.id,track(name,href,album(name,href)))""
             */
            fields?: string
            /**
             * A comma-separated list of item types that your client supports besides the default track type. Valid types are: track and episode.
             * Note: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future.
             * In addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the type field of each object.
             */
            additional_types?: string
        }
    }

};

export default PlaylistsMap;
