"use client";

import getMe from "@/app/actions/apiTest";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import login from "@/app/actions/login";

const inter = Inter({ subsets: ["latin"], weight: ["500"] });

const SpotifyIconImg = () => <div className="image-container">
    <Image
        src="/images/spotify-branding/Spotify_Icon_RGB_White.png"
        layout="fill"
        alt="Spotify Icon White"
    />
</div>;

const HeaderProfile: FC = () => {

    const [me, setMe] = useState<Me>();

    useEffect(() => {
        getMe().then(me => setMe(me));
    }, [])

    if (!me) return (
        <button onClick={ () => login() }>
            <SpotifyIconImg />
            <p className={ inter.className }>Login with Spotify</p>
        </button>
    );

    return (
        <img src={ me.images[0].url } alt="Profile image" />
    );
};

export default HeaderProfile;
