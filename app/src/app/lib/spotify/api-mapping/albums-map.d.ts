export type AlbumsMap = {

    "/albums/": {
        method: "GET"
        params: {
            id: AlbumId
            market: Market
        }
        responseData: Album
    }

    "/albums": {
        method: "GET"
        params: {
            ids: AlbumIds
            market: Market
        }
        responseData: { albums: Album[] }
    }

};

export default AlbumsMap;
