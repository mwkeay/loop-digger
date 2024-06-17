import { Metadata } from "next";
import { ReactNode } from "react";
import "@/styles/global.css";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Loop Digger",
    description: "A web application developed for the undergraduate engineering dissertation \"Developing a Sample-Based Recommendation Method for Human-Driven Music Discovery on Spotify\".",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body>{children}</body>
            <Script src="https://sdk.scdn.co/spotify-player.js" strategy="lazyOnload" />
        </html>
    );
};

export default RootLayout;
