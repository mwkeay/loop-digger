interface EditorSample {
    id: number | undefined
    track: Track | undefined
    startMs: number
    durationMs: number
}

interface DatabaseSample {
    id: number
    breakdownId: number
    trackId: string
    startMs: number
    durationMs: number
}

interface EditorSequenceStep {
    id: number | undefined
    sampleId: number | undefined
    startMs: number
    newDurationMs: number
    loops: number | undefined
    reversed: number | undefined
    interpolated: number | undefined
}

interface DatabaseSequenceStep {
    id: number
    breakdownId: number
    sampleId: number
    startMs: number
    newDurationMs: number
    loops: number | undefined
    reversed: number | undefined
    interpolated: number | undefined
}

interface EditorBreakdown {
    id: number | undefined
    author: number | undefined
    track: Track | undefined
    samples: Sample[]
    sequence: SequenceStep[]
}

interface DatabaseBreakdown {
    id: number
    author: number
    breakdownTrackId: string
    samples: Sample[]
    sequence: SequenceStep[]
}
