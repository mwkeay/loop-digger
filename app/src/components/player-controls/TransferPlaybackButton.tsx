"use client";

import transferPlaybackToDevice from "@/app/actions/transferPlaybackToDevice";
import { usePlayer } from "@/lib/spotify/player/context";
import { FC } from "react";

const TransferPlaybackButton: FC = () => {

    const { deviceId } = usePlayer();

    if (!deviceId) return (
        <button disabled={ true }>
            Transfer Playback
        </button>
    );

    return (
        <button onClick={ () => transferPlaybackToDevice(deviceId) }>
            Transfer Playback
        </button>
    );
};

export default TransferPlaybackButton;
