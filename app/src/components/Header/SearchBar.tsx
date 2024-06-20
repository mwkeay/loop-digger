"use client";

import search from "@/app/actions/search";
import { SearchType, SearchTypeSet } from "@/lib/spotify/api-mapping/search-map";
import Image from "next/image";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";

const SearchIconImg = () => <div id="search-icon-container">
    <Image
        id="search-icon"
        src="/images/search-icon.svg"
        layout="fill"
        alt="Search icon"
    />
</div>;

const SearchBar: FC<{ setSearch: Dispatch<SetStateAction<Search | undefined>> }> = ({ setSearch }) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const q = event.target.value;
        const types: SearchTypeSet = new Set(["track", "artist", "album"] as SearchType[]);

        search(q, types)
        .then((search) => setSearch((prev) => search ?? prev));
    };

    return (
        <form className={"search-bar"}>
            <SearchIconImg />
            <input
                onChange={ handleChange }
                placeholder="Search for tracks, artists and albums on Spotify"
                spellCheck="false"
            />
        </form>
    );
};

export default SearchBar;
