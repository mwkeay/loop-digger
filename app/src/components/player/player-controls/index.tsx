import logger from "@/lib/logger";
import { usePlayer } from "@/lib/spotify/player/context";
import { ReactNode, useEffect, useState } from "react";

export const NextTrackBtn = (props: { children: ReactNode }) => {

    const { isActive, player } = usePlayer();

    const handle = () => {

        if (!player) {
            logger.warn("Web player function nextTrack called without Player instance.");
            return;
        }

        player.nextTrack()
            .catch((error: any) => logger.error("Web player function nextTrack failed.", error));
    };

    return <button
        className="next-track-btn"
        disabled={ !isActive }
        onClick={ handle }
    >
        { props.children }
    </button>;
};

export const PauseBtn = (props: { children: ReactNode }) => {

    const { isActive, player } = usePlayer();

    const handle = () => {

        if (!player) {
            logger.warn("Web player function pause called without Player instance.");
            return;
        }

        player.pause()
            .catch((error: any) => logger.error("Web player function pause failed.", error));
    };

    return <button
        className="pause-btn"
        disabled={ !isActive }
        onClick={ handle }
    >
        { props.children }
    </button>;
};

export const PreviousTrackBtn = (props: { children: ReactNode }) => {

    const { isActive, player } = usePlayer();

    const handle = () => {

        if (!player) {
            logger.warn("Web player function previousTrack called without Player instance.");
            return;
        }

        player.previousTrack()
            .catch((error: any) => logger.error("Web player function previousTrack failed.", error));
    };

    return <button
        className="previous-track-btn"
        disabled={ !isActive }
        onClick={ handle }
    >
        { props.children }
    </button>;
};

export const ResumeBtn = (props: { children: ReactNode }) => {

    const { isActive, player } = usePlayer();

    const handle = () => {

        if (!player) {
            logger.warn("Web player function resume called without Player instance.");
            return;
        }

        player.resume()
            .catch((error: any) => logger.error("Web player function resume failed.", error));
    };

    return <button
        className="resume-btn"
        disabled={ !isActive }
        onClick={ handle }
    >
        { props.children }
    </button>;
};

export const TogglePlayBtn = (props: { children: ReactNode }) => {

    const { isActive, player } = usePlayer();

    const handle = () => {

        if (!player) {
            logger.warn("Web player function togglePlay called without Player instance.");
            return;
        }

        player.togglePlay()
            .catch((error: any) => logger.error("Web player function togglePlay failed.", error));
    };

    return <button
        className="toggle-play-btn"
        disabled={ !isActive }
        onClick={ handle }
    >
        { props.children }
    </button>;
};

export const VolumeSlider = () => {

    const { volume, setVolume } = usePlayer();
    const [sliderValue, setSliderValue] = useState(volume);

    // Update local slider state when the context volume changes
    useEffect(() => setSliderValue(volume), [volume]);

    // Handle slider inputs
    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const newVolume = parseFloat(event.target.value);
        setSliderValue(newVolume);
        setVolume(newVolume);
    };

    return (
        <input
            type="range"
            min="0"
            max="1"
            step="0.1" // Set low to reduce Spotify API rates during development
            value={ sliderValue }
            onChange={ handleVolumeChange }
            className="volume-slider"
        />
    );
};

export const PlayerControls = () => {

    const context = usePlayer();

    return (
        <div className="wp-controls">
            <PreviousTrackBtn>{ "< |" }</PreviousTrackBtn>
            <TogglePlayBtn>{ context.state?.paused ? ">" : "| |" }</TogglePlayBtn>
            <NextTrackBtn>{ "| >" }</NextTrackBtn>
            <VolumeSlider />
        </div>
    );
};
