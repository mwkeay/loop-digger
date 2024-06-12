import { Metadata } from "next";
import { ReactNode } from "react";
import "@/app/styles/global.css";

export const metadata: Metadata = {
    title: "Loop Digger",
    description: "A web application developed for the undergraduate engineering dissertation \"Developing a Sample-Based Recommendation Method for Human-Driven Music Discovery on Spotify\".",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
