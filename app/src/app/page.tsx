import Link from "next/link";
import { FC } from "react";
import config from "@/config/spotify";
import "@/app/styles/home.css";

const Page: FC = () => {

    const url = `https://accounts.spotify.com/authorize?response_type=code`
        + `&client_id=${config.clientId}`
        + `&scope=${encodeURIComponent(config.scopes.join(" "))}`
        + `&redirect_uri=${encodeURIComponent(config.redirectUri)}`

    return (
        <main className="home">
            <div>
                <h1>Hello, World!</h1>
                <p>Click <Link href={ url }>here</Link> to log in to your Spotify account</p>
            </div>
        </main>
    );
};

export default Page;
