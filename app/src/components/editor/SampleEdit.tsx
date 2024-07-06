"use client";

import { useEditor } from "@/lib/editor/context";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import ArtistNames from "../ArtistNames";
import TrackSearch from "../TrackSearch";
import logger from "@/lib/logger";
import PlayFill from "../player/player-controls/PlayFill";
import { usePlayer } from "@/lib/spotify/player/context";

const SampleEdit: FC = () => {

    const { samples, sampleEdit } = useEditor();
    const { positionMs } = usePlayer();

    const [startMs, setStartMs] = useState<number | undefined>();
    const [durationMs, setDurationMs] = useState<number | undefined>();
    const [endMs, setEndMs] = useState<number | undefined>();

    const sample = sampleEdit.currentIndex != null ? samples[sampleEdit.currentIndex] : null;

    // ================
    //     Handling
    // ================

    // On start change
    const handleStartChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const startMs = Number(e.target.value) || undefined;
        setStartMs(startMs);
        if (!sample) return logger.error("Sample Edit: sample not defined in handleStartChange.");
        sampleEdit.setSample({ ...sample, startMs });
    }, [sample])

    // On duration change
    const handleDurationChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const durationMs = Number(e.target.value) || undefined;
        setDurationMs(durationMs);
        setEndMs((sample?.startMs ?? 0) + (durationMs ?? 0));
        if (!sample) return logger.error("Sample Edit: sample not defined in handleEndChange.");
        sampleEdit.setSample({ ...sample, durationMs });
    }, [sample])

    // On end change
    const handleEndChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const endMs = Number(e.target.value) || undefined;
        setEndMs(endMs);
        setDurationMs((endMs ?? 0) - (startMs ?? 0));
        if (!sample) return logger.error("Sample Edit: sample not defined in handleEndChange.");
        sampleEdit.setSample({ ...sample, durationMs: (endMs ?? 0) - (sample.startMs ?? 0) });
    }, [sample])

    // On sample change
    useEffect(() => {
        setStartMs(sample?.startMs);
        setDurationMs(sample?.durationMs);
        setEndMs((sample?.startMs && sample?.durationMs) ? sample?.startMs + sample?.durationMs : undefined);
    }, [sample, sampleEdit.currentIndex, setStartMs])

    // =================
    //     Rendering
    // =================

    // No active sample
    if (!sample) return (
        <div id="editor-sample-edit">
            <TrackSearch disabled trackCallback={() => {}} />
            <div className={"times disabled"}>
                <div>
                    <span>{"Start time (ms)"}</span>
                    <input disabled={true} placeholder="0" />
                </div>
                <div>
                    <span>{"Duration (ms)"}</span>
                    <input disabled={true} placeholder="0" />
                </div>
                <div>
                    <span>{"End time (ms)"}</span>
                    <input disabled={true} placeholder="0" />
                </div>
            </div>
        </div>
    );

    // Active sample
    return (
        <div id="editor-sample-edit">
            
            {sample.track
            
                ? <div className="track">
                    <div className="img-container">
                        <PlayFill track={sample.track} />
                        <img src={sample.track.album.images[1].url} />
                    </div>
                    <div className="details">
                        <span className="name">{sample.track.name}</span>
                        <span className="artists"><ArtistNames artists={sample.track.artists} /></span>
                    </div>
                </div>

                : <TrackSearch trackCallback={track => sampleEdit.setSample({ ...sample, track })} />
            }

            <div className={"times" + (!sample.track ? " disabled" : "")}>
                <div>
                    <span>{"Start time (ms)"}</span>
                    <input
                        value={startMs || ""} // Empty string in place of undefined as undefined does not update input value
                        onChange={handleStartChange}
                        disabled={!sample.track}
                        type="number"
                        placeholder="0"
                    />
                </div>
                <div>
                    <span>{"Duration (ms)"}</span>
                    <input
                        value={durationMs || ""} // Empty string in place of undefined as undefined does not update input value
                        onChange={handleDurationChange}
                        disabled={!sample.track}
                        type="number"
                        placeholder="0"
                    />
                </div>
                <div>
                    <span>{"End time (ms)"}</span>
                    <input
                        value={endMs || ""} // Empty string in place of undefined as undefined does not update input value
                        onChange={handleEndChange}
                        disabled={!sample.track}
                        type="number"
                        placeholder="0"
                    />
                </div>
            </div>
        </div>
    );
};

export default SampleEdit;
