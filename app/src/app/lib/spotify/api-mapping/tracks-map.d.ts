export type TracksMap = {

    "/tracks/": {
        method: "GET"
        params: {
            id: TrackId
            market?: Market
        }
        responseData: Album
    }

    "/tracks": {
        method: "GET"
        params: {
            ids: TrackIds
            market?: Market
        }
        responseData: { tracks: Track[] }
    }

};

export default TracksMap;
