export type ArtistsMap = {

    "/artists/": {
        method: "GET"
        params: {
            id: ArtistId
        }
        responseData: Artist
    }

    "/artists": {
        method: "GET"
        params: {
            ids: ArtistIds
        }
        responseData: { artists: Artist[] }
    }

};

export default ArtistsMap;
