"use client";

import "@/styles/search.css";
import search from "@/app/actions/search";
import { SearchType, SearchTypeSet } from "@/lib/spotify/api-mapping/search-map";
import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import StyledInput from "../StyledInput";
import { TrackItem } from "../tracks";

// ======================
//     Search Results
// ======================

interface SearchResultsProps {
    results: Search
    linked: boolean
}

const SearchResults: FC<SearchResultsProps> = ({ results, linked }) => {
    console.log(results.tracks.items.map((track: Track) => track.album.images.map((image: Image) => image.height + "x" + image.width)));

    return (
        <div className="search-results">
            {
                results.tracks.items.map((track: Track) => (
                    <TrackItem track={ track } /> 
                ))
            }
        </div>
    );
};

// ==================
//     Search Bar
// ==================

interface SearchProps {
    types: SearchTypeSet,
    idCallback?: Dispatch<SetStateAction<string | undefined>>,
    linked?: boolean,
}

const Search: FC<SearchProps> = ({ types, idCallback, linked }) => {

    // Determine the value of linked based on idCallback if not explicitly set
    const effectiveLinked = linked !== undefined ? linked : !idCallback;

    const [searchResults, setSearchResults] = useState<Search>();

    const refreshSearch = useCallback(async (query: string) => {
        if (query == "") {
            setSearchResults(undefined);
        }
        const searchResults = await search(query, types);
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
                    ? <SearchResults results={ searchResults } linked={ effectiveLinked } />
                    : null
            }
        </div>
    );
}

export default Search;
