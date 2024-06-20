"use client";

import "@/styles/player-test.css";
import { FC } from "react";
import TransferPlaybackButton from "./player-controls/TransferPlaybackButton";
import { NextTrackBtn, PreviousTrackBtn, TogglePlayBtn } from "./player-controls";
import { usePlayer } from "@/lib/spotify/player/context";
import { SeekSlider } from "./player-controls/SeekSlider";

const PlayerTest: FC = () => {

    const { state, currentTrack } = usePlayer();

    return (
        <div className="player-test">

            {
                currentTrack

                    ? <div className="info">
                        <p>{ currentTrack?.name }</p>
                        <p>{ currentTrack?.artists.map(artist => artist.name).join(", ") }</p>
                    </div>

                    : null
            }

            <div className="buttons">
                <TransferPlaybackButton className="transfer-playback-btn" />
                <PreviousTrackBtn>{ "<<" }</PreviousTrackBtn>
                <TogglePlayBtn>{ state && !state.paused ? "| |" : ">" }</TogglePlayBtn>
                <NextTrackBtn>{ ">>" }</NextTrackBtn>
                <SeekSlider />
            </div>

        </div>
    );
};

export default PlayerTest;
