import { Metadata } from "next";
import Image from "next/image"
import "../../styles/test.css";

export const metadata: Metadata = {
    title: "Loop Digger - Test",
    icons: "/favicon.ico"
};

/**
 * Next.js pages cannot be a named export alongside a default export.
 * @example
 * const Page = () => {...}; // Success
 * export const Page = () => {...}; // Error
 */

/** */
const Page = () => {
    return (
        <div className="test">
            <h1>Test Page</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in blandit nibh, at molestie odio. Donec venenatis dui sit amet ante scelerisque, at pharetra orci vulputate. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec accumsan maximus fringilla. Pellentesque blandit, dolor iaculis suscipit interdum, turpis elit commodo elit, efficitur facilisis turpis arcu ut felis. Ut rhoncus fermentum vestibulum. Sed ornare nulla mattis felis accumsan condimentum. Sed pretium, massa eu pellentesque auctor, est justo sagittis nunc, sit amet varius nisi eros nec turpis. Vestibulum convallis a tortor at porta. Nullam bibendum non risus nec dictum. Sed ultrices neque eu tincidunt condimentum.</p>
            <Image
                className="test-img"
                src="/images/test.png"
                width={300}
                height={300}
                alt="Test image"
            />
        </div>
    );
};

export default Page;
