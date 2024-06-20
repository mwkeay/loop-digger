"use client";

import "@/styles/header.css";
import Image from "next/image";
import { FC, useState } from "react";
import SearchBar from "./SearchBar";
import HeaderProfile from "./HeaderProfile";
import SearchResults from "./SearchResults";

const LoopDiggerIconImg = () => <div id="loop-digger-icon-container">
    <Image
        id="loop-digger-icon"
        src="/images/loop-digger-icon.svg"
        layout="fill"
        alt="Loop Digger Icon"
    />
</div>;

const Header: FC = () => {

    const [search, setSearch] = useState<Search>();

    return (
        <div id="header">

            <LoopDiggerIconImg />

            <div className="search">
                <SearchBar setSearch={ setSearch } />
                {
                    search
                        ? <SearchResults search={search} />
                        : undefined
                }
            </div>

            <HeaderProfile />

        </div>
    );
};

export default Header;
