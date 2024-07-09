import EditorProvider from "@/components/editor/EditorProvider";
import { EditorContext } from "@/lib/editor/context";
import { cookies } from "next/headers";
import { FC } from "react";
import login from "../actions/login";
import StartPopup from "@/components/editor/StartPopup";
import SamplesView from "@/components/editor/SamplesView";
import SampleEdit from "@/components/editor/SampleEdit";
import PlayerTest from "@/components/player/PlayerTest";
import EditorVisualizer from "@/components/editor/EditorVisualizers";

import "@/styles/editor/page.css";
import SaveButton from "@/components/editor/SaveButton";

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
                <StartPopup />
                <EditorVisualizer />
                <div id="editor-page-samples">
                    <SamplesView />
                    <SampleEdit />
                </div>
                <SaveButton />
            </main>
            <PlayerTest />
        </EditorProvider>
    );
};

export default Page;
