"use client";

import "@/styles/search.css";
import search from "@/app/actions/search";
import { SearchType } from "@/lib/spotify/api-mapping/search-map";
import { FC, useCallback, useMemo, useState } from "react";
import { debounce } from "lodash";
import StyledInput from "./StyledInput";
import { TrackItem } from "./tracks";

// ======================
//     Search Results
// ======================

interface SearchResultsProps {
    trackCallback: (track: Track) => void,
    results: Search
    linked: boolean
}

const SearchResults: FC<SearchResultsProps> = ({ trackCallback, results, linked }) => {
    return (
        <div className="search-results-container">
            <div className="search-results">
                {
                    results.tracks.items.map((track, index) => (
                        <TrackItem track={ track } onClick={ () => trackCallback(track) } key={index} /> 
                    ))
                }
            </div>
        </div>
    );
};

// ==================
//     Search Bar
// ==================

interface SearchProps {
    trackCallback: (track: Track) => void,
    linked?: boolean,
}

const TrackSearch: FC<SearchProps> = ({ trackCallback, linked }) => {

    // Determine the value of linked based on trackCallback if not explicitly set
    const effectiveLinked = linked !== undefined ? linked : !trackCallback;

    const [searchResults, setSearchResults] = useState<Search>();

    const refreshSearch = useCallback(async (query: string) => {
        if (query == "") {
            setSearchResults(undefined);
        }
        const searchResults = await search(query, new Set(["track"] as SearchType[]));
        if (searchResults) setSearchResults(searchResults);
    }, []);

    const debouncedRefreshSearch = useMemo(() => {
        return debounce(refreshSearch, 500);
    }, [refreshSearch]);

    return (
        <div className="search">
            <StyledInput
                callback={ (query: string) => debouncedRefreshSearch(query) }
                iconPath="/images/search-icon-white.svg"
                label="Pick a track"
            />
            {
                searchResults
                    ? <SearchResults trackCallback={ trackCallback } results={ searchResults } linked={ effectiveLinked } />
                    : null
            }
        </div>
    );
}

export default TrackSearch;
