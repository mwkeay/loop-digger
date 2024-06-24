"use client";

import "@/styles/tracks.css";
import ArtistNames from "@/lib/spotify/ArtistNames";
import { FC, useState } from "react";

function formatTime(milliseconds: number) {

    const minutes = Math.floor(milliseconds / 1000 / 60);
    const remainingSeconds = Math.floor(milliseconds / 1000 % 60);

    const paddedMinutes = minutes.toString()
    const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${paddedMinutes}:${paddedSeconds}`;
}


interface TrackItemProps {
    id?: string
    linked?: boolean
    track: Track | undefined
}

export const TrackItem: FC<TrackItemProps> = ({ id, linked = true, track }) => {

    return (
        <div id={ id } className={ "track-item" + (track ? "" : " undefined") }>

            <div className="img-container">
                { track && <img
                    src={ track.album.images[2].url }
                    alt={ track.name }
                /> }
            </div>

            { track && <>
                <div className="primary">
                    <span className="name">{ track.name }</span>
                    <span className="artists"><ArtistNames artists={ track.artists } /></span>
                </div>
                <span className="album">{ track.album.name }</span>
            </> }

            { track && <span className="length">{ formatTime(track.duration_ms) }</span> }

        </div>
    );
};
