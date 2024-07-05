import { useCallback, useEffect, useState } from "react";

import { usePlayer } from "@/lib/spotify/player/context";
import logger from "@/lib/logger";
import getTrack from "@/app/actions/getTrack";

export const SeekSlider = () => {

    const { currentTrack: playerTrack, isActive, player, state } = usePlayer();

    /**
     * =============
     *     TRACK
     * =============
     */

    // currentTrack obtained separately to useWebPlayer hook for safe (documented) duration
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

    // Get Track object from API
    useEffect(() => {
        if (!playerTrack?.id) return;
        getTrack(playerTrack.id)
            .then(track => {
                if (track) setCurrentTrack(track)
            });
    }, [playerTrack]);

    /**
     * ==============
     *     SLIDER
     * ==============
     */

    const [sliderValue, setSliderValue] = useState<number>(0);

    // On slider change
    const handleSeekSliderChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {

        if (!player) return;

        const input = parseFloat(event.target.value);

        try {
            await player.seek(input);
            setSliderValue(input);
        }
        catch {
            logger.error("SeekSlider handleSeekSliderChange failed.");
        }
    }, [player]);

    // On state change
    useEffect(() => {

        if (state) setSliderValue(state.position);
        else setSliderValue(0);

    }, [state]);

    // Automatically refresh state
    useEffect(() => {

        if (!player) return;

        const intervalId = setInterval(async () => {
            await player.getCurrentState();
        }, 1000);

        // Cleanup
        return () => clearInterval(intervalId);
    }, [player]);

    // Automatically increase slider when playing
    useEffect(() => {

        if (!state || !isActive || state.paused) return;

        const intervalId = setInterval(() => {
            setSliderValue(prev => prev + 100);
        }, 100);

        // Cleanup
        return () => clearInterval(intervalId);
    }, [isActive, setSliderValue, state]);

    // Update currentState on useWebPlayer update
    //useEffect(() => setCurrentState(state), [state]);

    return (
        <input
            type="range"
            disabled={ !isActive }
            min="0"
            max={ isActive ? currentTrack?.duration_ms || 0 : 0 }
            step="100"
            value={ sliderValue }
            onChange={ handleSeekSliderChange }
            className="seek-slider"
        />
    );
};
