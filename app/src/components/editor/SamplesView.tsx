"use client";

import { useEditor } from "@/lib/editor/context";
import { usePlayer } from "@/lib/spotify/player/context";
import { FC } from "react";

import "@/styles/editor/samples-view.css";

const formatMilliseconds = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    // Pad the minutes and seconds with leading zeros if necessary
    const formattedMinutes = minutes.toString().padStart(1, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0');

    return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
};

const SamplesView: FC = () => {

    const { createNewSample, samples, sampleEdit } = useEditor();
    const { isActive, playSample } = usePlayer();

    if (samples.length == 0) return (
        <div id="editor-samples-view">
            <button onClick={ createNewSample }>Create new sample</button>
        </div>
    );

    const children = samples.map((sample, index) => {
        return (
            <div onClick={() => sampleEdit.setCurrentIndex(index)} className={"sample" + (index == sampleEdit.currentIndex ? " selected" : "")} key={index}>
                <div className="img-container">
                    {sample.track && <img src={sample.track.album.images[1].url} />}
                </div>
                <span className="start">{sample.startMs != undefined ? formatMilliseconds(sample.startMs) : "?"}</span>
                &rArr;
                <span className="duration">{(sample.startMs != undefined) ? formatMilliseconds(sample.startMs + (sample.durationMs ?? 0)) : "?"}</span>
                
                <button
                    onClick={ () => playSample(sample) }
                    disabled={!sample.track || !sample.startMs || !sample.durationMs || !isActive}
                >
                    Play
                </button>
            </div>
        );
    });

    return (
        <div id="editor-samples-view">
            {children}
            <button onClick={ createNewSample }>Create new sample</button>
        </div>
    );
};

export default SamplesView;
