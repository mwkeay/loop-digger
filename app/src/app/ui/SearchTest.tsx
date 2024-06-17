"use client";

import { useState } from "react";
import search from "../actions/search";
import { SearchTypeSet, SearchType } from "../lib/spotify/api-mapping/search-map";

const SearchTest = () => {

    const [searchResults, setSearchResults] = useState<Search>();

    const TYPES: SearchTypeSet = new Set(["artist", "album", "track"] as SearchType[]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const q = formData.get("searchQuery") as string;

        setSearchResults(await search(q, TYPES));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="searchQuery">Search:</label>
                <input type="text" id="searchQuery" name="searchQuery" placeholder="Search..." required />
                <button type="submit">Search</button>
            </form>
            <pre>{ JSON.stringify(Object.entries(searchResults ?? {}).map(([key, value]) => [key, value.total]), null, 2) }</pre>
        </div>
    );
};

export default SearchTest;
