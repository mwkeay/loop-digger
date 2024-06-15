"use server";

import getAudioAnalysis from "../actions/getAudioAnalysis";

const ClientCredentialsTest = async () => {

    const track = await getAudioAnalysis("083HuPvgqYBLUiv82bVxwE");

    return (
        <pre>
            { JSON.stringify(track, null, 2) }
        </pre>
    );
};

export default ClientCredentialsTest;
