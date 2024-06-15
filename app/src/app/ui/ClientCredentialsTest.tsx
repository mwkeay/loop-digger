"use server";

import getTrack from "../actions/getTrack";

const ClientCredentialsTest = async () => {

    const track = await getTrack("083HuPvgqYBLUiv82bVxwE");

    return (
        <pre>
            { JSON.stringify(track, null, 2) }
        </pre>
    );
};

export default ClientCredentialsTest;
