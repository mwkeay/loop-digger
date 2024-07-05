"use client";

import { FC, useEffect } from "react";

import TrackSearch from "@/components/TrackSearch";
import { useEditor } from "@/lib/editor/context";
import { useSearchParams } from "next/navigation";
import getTrack from "@/app/actions/getTrack";


const PickTrackPopup: FC = () => {

    const { track, setTrack } = useEditor();

    const searchParams = useSearchParams();
    useEffect(() => {
        const trackId = searchParams.get("track");
        if (!trackId) return;
        getTrack(trackId).then((track) => track && setTrack(track));
    }, []);

    return (
        <div id="editor-new-breakdown-popup-container" className={ track ? "hidden" : undefined }>
            <div id="editor-new-breakdown-popup">
                <TrackSearch trackCallback={ setTrack } />
            </div>
        </div>
    );
};

export default PickTrackPopup;
