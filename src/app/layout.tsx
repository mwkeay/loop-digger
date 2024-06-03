import { Metadata } from "next";
import { ReactNode } from "react";
import "../styles/global.css";

export const metadata: Metadata = {
    title: "Loop Digger"
};

/**
 * RootLayout cannot be a named export alongside a default export.
 * @example
 * const RootLayout = () => {...}; // Success
 * export const RootLayout = () => {...}; // Error
 */

/** */
const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
