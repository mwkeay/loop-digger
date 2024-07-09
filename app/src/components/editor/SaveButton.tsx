"use client";

import { useEditor } from "@/lib/editor/context";
import logger from "@/lib/logger";

const SaveButton = () => {

    const { save } = useEditor();

    const handleButton = () => {
        save()
    }

    return (
        <button onClick={handleButton}>Save</button>
    );
};

export default SaveButton;
