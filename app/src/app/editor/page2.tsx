"use client";

import "@/styles/editor.css";
import { useSearchParams } from "next/navigation";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react";
import getTrack from "../actions/getTrack";
import ArtistNames from "@/components/ArtistNames";
import StyledInput from "@/components/StyledInput";
import TrackSearch from "@/components/TrackSearch";

function formatTime(milliseconds: number) {

    const minutes = Math.floor(milliseconds / 1000 / 60);
    const remainingSeconds = Math.floor(milliseconds / 1000 % 60);

    const paddedMinutes = minutes.toString()
    const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${paddedMinutes}:${paddedSeconds}`;
}

// ===================
//     Sample Edit
// ===================

interface SampleEditProps {
    selection: number | undefined
    setBreakdown: Dispatch<SetStateAction<EditorBreakdown>>
}

const SampleEdit: FC<SampleEditProps> = ({ selection, setBreakdown }) => {

    const searchTrackCallback = (track: Track) => {};

    return (
        <div id="editor-sample-edit">

            { track
                ? <span>{ track.name }</span>
                : <TrackSearch trackCallback={ searchTrackCallback } />
            }

            <div className="timings">
                <StyledInput callback={ () => {} } filter={ value => /^\d+$/.test(value) || value === "" } label="Start" />
                <StyledInput callback={ () => {} } filter={ value => /^\d+$/.test(value) || value === "" } label="End" />
            </div>

        </div>
    );
};

// ===================
//     Sample List
// ===================

interface SampleListItemProps {
    key: number
    onClick: () => void
    sample: EditorSample
    selected?: boolean
    setBreakdown: Dispatch<SetStateAction<EditorBreakdown>>
}

const SampleListItem: FC<SampleListItemProps> = ({ key, onClick, sample, selected = false, setBreakdown }) => {
    return (
        <div
            key={ key }
            className={ "editor-sample-list-item" + (selected ? " selected" : "") }
            onClick={ onClick }
        >
            <div className="img-container">
                { sample.track && <img src={ sample.track.album.images[1].url } alt="sample cover art" /> }
            </div>

            <div className="timing">
                <span>{ formatTime(sample.startMs) }</span>
                <span className="arrow">&rArr;</span>
                <span>{ formatTime(sample.startMs + sample.durationMs) }</span>
            </div>
        </div>
    );
};

const INIT_SAMPLE: EditorSample = {
    id: undefined,
    track: undefined,
    startMs: 0,
    durationMs: 0,
};

interface SampleListProps {
    samples: EditorSample[]
    selection: number
    setBreakdown: Dispatch<SetStateAction<EditorBreakdown>>
    setSelection: Dispatch<SetStateAction<number>>
}

const SampleList: FC<SampleListProps> = ({ samples, selection, setBreakdown, setSelection }) => {

    const addNewSample = useCallback(() => setBreakdown(prev => ({
        ...prev,
        samples: [...prev.samples, INIT_SAMPLE]
    })), [setBreakdown]);

    return (
        <div id="editor-sample-list">

            <div className="samples">
                { samples.map((sample, index) => <SampleListItem
                    onClick={ () => setSelection(index) }
                    setBreakdown={ setBreakdown }
                    key={ index }
                    sample={ sample }
                    selected={ selection === index }
                />) }
            </div>

            <button onClick={ () => addNewSample() }>+</button>

        </div>
    );
};

// ==================
//     Track Head
// ==================

const TrackHead: FC<{ track: Track }> = ({ track }) => {
    return (
        <div id="editor-track-head">
            <div className="img-container">
                <img src={ track.album.images[1].url } alt="editor-track-head-img" />
            </div>
            <div>
                <span className="name">{ track.name }</span>
                <span className="artists">{ <ArtistNames artists={ track.artists } /> }</span>
            </div>
        </div>
    );
};

// ============
//     Page
// ============

const INIT_BREAKDOWN: EditorBreakdown = {
    id: undefined,
    author: undefined,
    track: undefined,
    samples: [],
    sequence: [],
};

const Page: FC = () => {

    const searchParams = useSearchParams()

    const [breakdown, setBreakdown] = useState<EditorBreakdown>(INIT_BREAKDOWN);
    const [selection, setSelection] = useState<number>(-1);

    // Set track by query params
    useEffect(() => {
        const trackId = searchParams.get("track");
        if (!trackId) return;
        getTrack(trackId).then((track) => track && setBreakdown((prev) => ({ ...prev, track })));
    }, []);

    return (
        <main id="editor-page">
            { breakdown.track && <>
                <TrackHead track={ breakdown.track } />
            </> }

            <div>

                <div className={ breakdown.track ? undefined : "disabled" }>
                    <label htmlFor="editor-sample-list" className="title">Samples</label>
                    <SampleList setBreakdown={ setBreakdown } samples={ breakdown.samples } selection={ selection } setSelection={ setSelection } />
                </div>

                <div className={ selection != -1 ? undefined : "disabled" }>
                    <label htmlFor="editor-sample-edit" className="title">Edit</label>
                    <SampleEdit setBreakdown={ setBreakdown } selection={ selection } />
                </div>

            </div>

        </main>
    );
};

export default Page;
