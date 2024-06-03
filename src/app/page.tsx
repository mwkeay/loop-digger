import { FC } from "react";

/**
 * Next.js pages cannot be a named export alongside a default export.
 * @example
 * const Page = () => {...}; // Success
 * export const Page = () => {...}; // Error
 */

/** */
const Page: FC = () => {
    return (
        <div>
            <h1>Hello, Next.js!</h1>
        </div>
    );
};

export default Page;
