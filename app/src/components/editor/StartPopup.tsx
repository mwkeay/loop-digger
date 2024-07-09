"use client";

import { FC, useEffect, useState } from "react";

import TrackSearch from "@/components/TrackSearch";
import { useEditor } from "@/lib/editor/context";
import { useSearchParams } from "next/navigation";
import getTrack from "@/app/actions/getTrack";

import "@/styles/editor/start-popup.css";
import getBreakdown from "@/app/actions/getBreakdown";
import logger from "@/lib/logger";

const StartPopup: FC = () => {

    const [isLoading, setIsLoading] = useState(true);

    const { track, setTrack, loadFromDb } = useEditor();

    const searchParams = useSearchParams();

    // Load based on search params
    useEffect(() => {

        // ID
        const databaseId = searchParams.get("id");
        if (databaseId) {
            if (isNaN(Number(databaseId))) logger.error("Invalid ID search parameter.");
            else {
                try {
                    getBreakdown(Number(databaseId))
                        .then(dbBreakdown => loadFromDb(dbBreakdown));
                    // End loading
                    setIsLoading(false)
                    return;
                }
                catch (error) {
                    logger.error("Failed to fetch editor data.", error);
                }
            }
        }

        // Track
        if (!databaseId) {
            const trackId = searchParams.get("track");
            if (!trackId) {
                setIsLoading(false);
                return;
            }
            getTrack(trackId).then((track) => track && setTrack(track));
            setIsLoading(false);
        }

    }, []);

    return (
        <div id="editor-start-popup-container" className={ track ? "hidden" : undefined }>
            <div id="editor-start-popup">
                {isLoading ? "loading" : <TrackSearch trackCallback={ setTrack } />}
            </div>
        </div>
    );
};

export default StartPopup;
