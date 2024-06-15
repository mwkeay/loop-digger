export type TracksMap = {

    "/tracks/": {
        method: "GET"
        params: {
            id: TrackId
            market?: Market
        }
        responseData: Track
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
