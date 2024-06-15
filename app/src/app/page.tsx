"use server";

import "@/app/styles/home.css";
import LoginLink from "@/app/ui/LoginLink";
import ServerTest from "./ui/ServerTest";

const Page = () => {

    const signedIn = true;

    return (
        <main className="home">

            <div className="home-title">
                <h1>Loop Digger</h1>
                <p>
                    A web application developed for the undergraduate engineering dissertation "
                    <i>Developing a Sample-Based Recommendation Method for Human-Driven Music Discovery on Spotify</i>
                    ".
                </p>
            </div>

            {
                signedIn

                    ? <>
                        <p className="home-body">You are signed in!</p>
                        <ServerTest />
                    </>

                    : <div>
                        <p className="home-body">
                            Click &rarr; <LoginLink>HERE</LoginLink> &larr; to log into Spotify
                        </p>
                    </div>
            }

        </main>
    );
};

export default Page;
