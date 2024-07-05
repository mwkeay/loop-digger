import { createContext, useContext } from "react";
import logger from "../logger";

export interface EditorContextSample {
    track: Track | undefined
    startMs: number | undefined
    durationMs: number | undefined
    databaseId?: number | undefined
}

export interface EditorContext {
    meta: {
        authorId: number | undefined
        created: Date
        public: boolean
    }

    samples: EditorContextSample[]
    track: Track | undefined

    createNewSample: () => void
    setSamples: (samples: EditorContextSample[]) => void
    setTrack: (track: Track) => void

    sampleEdit: {
        currentIndex: number | null
        setCurrentIndex: (index: number) => void
        setSample: (sample: EditorContextSample) => void
    }
}

export const createBlankEditorContext = (userId?: number): EditorContext => ({
    meta: {
        authorId: userId ?? undefined,
        created: new Date,
        public: false,
    },
    track: undefined,
    samples: [],
    createNewSample: () => logger.error("createNewSample called from EditorContext before assignment."),
    setSamples: () => logger.error("setSamples called from EditorContext before assignment."),
    setTrack: () => logger.error("setTrack called from EditorContext before assignment."),

    sampleEdit: {
        currentIndex: null,
        setCurrentIndex: () => logger.error("sampleEdit.setCurrentIndex called from EditorContext before assignment."),
        setSample: () => logger.error("sampleEdit.setSample called from EditorContext before assignment."),
    }
});

export const EditorContext = createContext<EditorContext>(createBlankEditorContext());

export const useEditor = () => useContext(EditorContext);
