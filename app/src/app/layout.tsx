import "@/styles/global.css";
import PlayerProvider from "@/components/PlayerProvider";
import { Metadata } from "next/types";
import Script from "next/script";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Loop Digger",
    description: "A web application developed for the undergraduate engineering dissertation \"Developing a Sample-Based Recommendation Method for Human-Driven Music Discovery on Spotify\".",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">

            <body>
                <PlayerProvider>
                    { children }
                </PlayerProvider>
            </body>

            <Script src="https://sdk.scdn.co/spotify-player.js" strategy="lazyOnload" />

        </html>
    );
};

export default RootLayout;
