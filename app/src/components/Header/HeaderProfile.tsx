import getMe from "@/app/actions/getMe";
import { FC } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import config from "@/lib/config";

const inter = Inter({ subsets: ["latin"], weight: ["500"] });

const SpotifyIconImg = () => <div className="image-container">
    <Image
        src="/images/spotify-branding/Spotify_Icon_RGB_White.png"
        fill={ true }
        alt="Spotify Icon White"
    />
</div>;

const HeaderProfile: FC = async () => {

    const me = await getMe()

    if (!me) return (
        <Link href={config.rootUrl + "/api/spotify/auth/login"}>
            <button type="button">
                <SpotifyIconImg />
                <p className={ inter.className }>Login with Spotify</p>
            </button>
        </Link>
    );

    return (
        <img src={ me.images[0].url } alt="Profile image" />
    );
};

export default HeaderProfile;
