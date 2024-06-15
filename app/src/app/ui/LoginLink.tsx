"use server";

import Link from "next/link";
import { FC, ReactNode } from "react";
import spotifyConfig from "@/app/lib/spotify/config";

const LoginLink: FC<{ children: ReactNode }> = ({ children }) => {

    const url = `https://accounts.spotify.com/authorize?response_type=code`
        + `&client_id=${spotifyConfig.clientId}`
        + `&scope=${encodeURIComponent(spotifyConfig.scopes.join(" "))}`
        + `&redirect_uri=${encodeURIComponent(spotifyConfig.redirectUri)}`

    return (
        <Link href={ url }>
            { children }
        </Link>
    );
};

export default LoginLink;
