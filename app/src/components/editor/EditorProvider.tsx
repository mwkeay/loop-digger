"use client";

import saveBreakdown from "@/app/actions/saveBreakdown";
import { EditorContext, EditorContextMeta, EditorContextSample, createBlankEditorContext } from "@/lib/editor/context";
import logger from "@/lib/logger";
import { FC, ReactNode, useCallback, useState } from "react";

type EditorProviderProps = {
    children: ReactNode
    initContext?: EditorContext
    userId?: number
    // Either initContext or userId will always be passed (based on logic in app/editor/page.tsx)
}

const EditorProvider: FC<EditorProviderProps> = ({ children, initContext, userId }) => {

    const [context, setContext] = useState<EditorContext>(initContext ?? createBlankEditorContext(userId));

    // =========================
    //     Context Functions
    // =========================

    const loadFromDb = (breakdown: {
        meta: EditorContextMeta
        track: Track
        samples: EditorContextSample[]
    }) => setContext(prev => ({
        ...prev,
        meta: breakdown.meta,
        track: breakdown.track,
        samples: breakdown.samples,
    }));

    const createNewSample = useCallback(() => setContext(prev => {
        const blankSample: EditorContextSample = { track: undefined, startMs: undefined, durationMs: undefined }
        const samples = prev.samples;
        return {
            ...prev,
            samples: [ ...samples, blankSample ],
            sampleEdit: {
                ...prev.sampleEdit,
                currentIndex: samples.length,
            }
        };
    }), []);
    
    const setSamples = useCallback((samples: EditorContextSample[]) => {
        setContext(prev => ({ ...prev, samples }));
    }, []);

    const setTrack = useCallback((track: Track) => {
        setContext(prev => ({ ...prev, track }));
    }, []);

    // Sample Edit

    const setCurrentIndex = useCallback((index: number) => {
        setContext(prev => ({
            ...prev,
            sampleEdit: {
                ...prev.sampleEdit,
                currentIndex: index
            }
        }));
    }, []);

    const setSample = useCallback((sample: EditorContextSample) => {
        setContext(prev => {
            if (prev.sampleEdit.currentIndex == null) {
                logger.error("Editor: sampleEdit.setSample called without sampleEdit.currentIndex set.")
                return prev;
            }
            const samples = [...prev.samples];
            samples[prev.sampleEdit.currentIndex] = sample;
            return ({ ...prev, samples });
        });
    }, []);

    // ==============
    //     Output
    // ==============

    const save = async () => {
        try {
            const databaseId = await saveBreakdown(context.meta, context.track?.id, context.samples);
            if (databaseId) setContext(prev => ({ ...prev, meta: { ...prev.meta, databaseId }}));
        }
        catch (error) {
            logger.error("Failed to save.", error);
        }
    };

    const passedContext: EditorContext = {
        ...context,
        createNewSample,
        setSamples,
        setTrack,
        sampleEdit: {
            ...context.sampleEdit,
            setCurrentIndex,
            setSample,
        },
        save,
        loadFromDb,
    };

    return (
        <EditorContext.Provider value={passedContext}>
            {children}
        </EditorContext.Provider>
    );
};

export default EditorProvider;
