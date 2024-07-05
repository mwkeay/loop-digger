import "@/styles/global.css";
import PlayerProvider from "@/components/player/PlayerProvider";
import { Metadata } from "next/types";
import Script from "next/script";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Loop Digger",
    description: "A web application developed for the undergraduate engineering dissertation \"Developing a Sample-Based Recommendation Method for Human-Driven Music Discovery on Spotify\".",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    const cookieStore = cookies();
    const authenticated = cookieStore.has("loopdigger_user_id") && cookieStore.has("loopdigger_spotify_user_id");

    return (
        <html lang="en">

            <body className={ inter.className }>
                {
                    authenticated
                        ? <PlayerProvider>
                            { <Header /> }
                            { children }
                        </PlayerProvider>

                        : <>
                            { <Header /> }
                            { children }
                        </>
                }
            </body>

            { authenticated && <Script src="https://sdk.scdn.co/spotify-player.js" strategy="lazyOnload" /> }

        </html>
    );
};

export default RootLayout;
