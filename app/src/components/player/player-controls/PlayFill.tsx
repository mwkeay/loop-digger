"use client";

import "@/styles/playfill.css";
import { usePlayer } from "@/lib/spotify/player/context";
import { FC } from "react";
import startPlayback from "@/app/actions/startPlayback";

const PlayFill: FC<{ track: Track }> = ({ track }) => {

    const { currentTrack, isActive, state, player } = usePlayer();

    if (!isActive) return;

    if (currentTrack?.id === track.id && !state?.paused) return (
        <div onClick={() => player?.pause()} className="player-playfill">
            Pause
        </div>
    )

    if (currentTrack?.id === track.id && state?.paused) return (
        <div onClick={() => player?.resume()} className="player-playfill">
            Play
        </div>
    )

    else return (
        <div onClick={() => startPlayback(track.id)} className="player-playfill">
            <span>Play</span>
        </div>
    );
};

export default PlayFill;
