"use server";

import "@/styles/home.css";
import LoginLink from "@/components/LoginLink";

const Page = () => {

    return (
        <main className="home">

            <div className="home-title">
                <h1>Loop Digger</h1>
                <p>
                    A web application developed for the undergraduate engineering dissertation &quot;
                    <i>Developing a Sample-Based Recommendation Method for Human-Driven Music Discovery on Spotify</i>
                    &quot;.
                </p>
            </div>

            <div>
                <p className="home-body">
                    Click &rarr; <LoginLink>HERE</LoginLink> &larr; to log into Spotify
                </p>
            </div>

        </main>
    );
};

export default Page;
