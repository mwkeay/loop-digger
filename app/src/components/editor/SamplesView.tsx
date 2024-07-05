"use client";

import startPlayback from "@/app/actions/startPlayback";
import { EditorContextSample, useEditor } from "@/lib/editor/context";
import logger from "@/lib/logger";
import { usePlayer } from "@/lib/spotify/player/context";
import { FC } from "react";

const SamplesView: FC = () => {

    const { createNewSample, samples, sampleEdit } = useEditor();

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
                <span className="start">{sample.startMs != undefined ? sample.startMs : "?"}</span>
                &rArr;
                <span className="duration">{(sample.startMs != undefined) ? sample.startMs + (sample.durationMs ?? 0) : "?"}</span>
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
