"use client";

import { FC, useEffect } from "react";

import TrackSearch from "@/components/TrackSearch";
import { useEditor } from "@/lib/editor/context";
import { useSearchParams } from "next/navigation";
import getTrack from "@/app/actions/getTrack";

import "@/styles/editor/start-popup.css";

const PickTrackPopup: FC = () => {

    const { track, setTrack } = useEditor();

    const searchParams = useSearchParams();
    useEffect(() => {
        const trackId = searchParams.get("track");
        if (!trackId) return;
        getTrack(trackId).then((track) => track && setTrack(track));
    }, []);

    return (
        <div id="editor-start-popup-container" className={ track ? "hidden" : undefined }>
            <div id="editor-start-popup">
                <TrackSearch trackCallback={ setTrack } />
            </div>
        </div>
    );
};

export default PickTrackPopup;
