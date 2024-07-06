import "@/styles/editor.css";
import EditorProvider from "@/components/editor/EditorProvider";
import { EditorContext } from "@/lib/editor/context";
import { cookies } from "next/headers";
import { FC } from "react";
import login from "../actions/login";
import PickTrackPopup from "@/components/editor/PickTrackPopup";
import SamplesView from "@/components/editor/SamplesView";
import SampleEdit from "@/components/editor/SampleEdit";
import TransferPlaybackButton from "@/components/player/player-controls/TransferPlaybackButton";
import PlayerTest from "@/components/player/PlayerTest";

/**
 * NextJS app router page with search parameters.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
 */
type EditorPage = FC<{ searchParams: { [key: string]: string | string[] | undefined } }>

const Page: EditorPage = ({ searchParams }) => {

    let initContext: EditorContext | undefined;
    let userId: number | undefined;

    const breakdownId = searchParams.id;
    if (breakdownId) /* initContext = getContextBasedOnDatabaseBreakdown(breakdownId) */ undefined; // CURRENTLY DISABLED

    if (!initContext) {
        const userIdCookie = cookies().get("loopdigger_user_id");
        if (userIdCookie) userId = Number(userIdCookie.value);
    }

    if (!initContext && !userId) {
        // handle this better
        login();
        return;
    }

    return (
        <EditorProvider initContext={initContext} userId={userId}>
            <main id="editor-page">
                <PickTrackPopup />
                <SamplesView />
                <SampleEdit />
            </main>
            <PlayerTest />
        </EditorProvider>
    );
};

export default Page;
