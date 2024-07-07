"use client";

import { FC } from "react";
import Visualizer from "../Visualizer";
import { useEditor } from "@/lib/editor/context";

const EditorVisualizers: FC = () => {

    const { track, samples } = useEditor();

    return (
        <div id="editor-visualizers-container">
            <Visualizer track={track ?? null} />
            {samples.map(sample => sample.track ? <Visualizer track={sample.track} /> : null)}
        </div>
    );
};

export default EditorVisualizers;
