"use server";

import { SearchQuery, SearchTypeSet } from "../lib/spotify/api-mapping/search-map";
import { getCCToken } from "../lib/spotify/auth/client-credentials-flow";

const search = async (q: SearchQuery, types: SearchTypeSet) => {

    const ccToken = await getCCToken()

    if (!ccToken) {
        console.error("Server action getCCToken failed in search.");
        return;
    }

    const accessToken = ccToken.accessToken;

    try {
        const queryParams = new URLSearchParams({
            q,
            type: Array.from(types).join(","),
        }).toString();

        const response = await fetch("https://api.spotify.com/v1/search?" + queryParams, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        if (!response.ok) {
            throw new Error("Spotify GET /track/ failed with status: " + response.status);
        }

        const search: Search = await response.json();

        console.log("Spotify GET /search 200");

        return search;
    }

    catch (error) {
        console.error("Spotify GET /search failed.", error);
        return;
    }
};

export default search;
