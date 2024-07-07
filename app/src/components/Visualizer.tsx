"use client";

import { FC, useEffect, useRef, useState } from "react";

import "@/styles/visualizer.css";
import { usePlayer } from "@/lib/spotify/player/context";
import PlayFill from "./player/player-controls/PlayFill";
import logger from "@/lib/logger";

interface VisualizerProps {
    track: Track | null
}

const Visualizer: FC<VisualizerProps> = ({ track }) => {

    const { currentTrack, positionMs } = usePlayer();

    const timelineRef = useRef<HTMLSpanElement>(null);
    const positionRef = useRef<HTMLSpanElement>(null);

    // ================
    //     Position
    // ================

    useEffect(() => {
        // Cancel if player track or visualizer track is undefined
        if (!track || !currentTrack) return;
        // Cancel if visualizer track not playing
        if (track.id != currentTrack.id) return;
        // Cancel if position null
        if (!positionMs) return;

        const updatePosition = () => {
            if (!timelineRef.current || !positionRef.current) return;
            const timelineWidthPx = timelineRef.current.clientWidth;
            const positionPx = timelineWidthPx * (positionMs / track.duration_ms);
            positionRef.current.style.width = positionPx + "px";
        }

        const frameId = requestAnimationFrame(updatePosition);
        return () => cancelAnimationFrame(frameId);
    }, [positionMs, track, currentTrack])

    // =================
    //     Rendering
    // =================

    if (!track) return (
        <div className={"visualizer"}>
            <div className="img-container" />
            <div className="timeline-container">
                <span className="timeline" />
            </div>
        </div>
    )

    return (
        <div className={"visualizer"}>

            <div className="img-container">
                <PlayFill track={track} />
                <img src={track.album.images[0].url} />
            </div>

            <div className="timeline-container">
                <span ref={timelineRef} className="timeline" />
                <span ref={positionRef} className="position-pointer"  />
            </div>

        </div>
    );
};

export default Visualizer;
