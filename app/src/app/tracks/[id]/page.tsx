"use server";

import "@/app/styles/tracks.css";
import getTrack from "@/app/actions/getTrack";
import config from "@/app/lib/config";
import { redirect } from "next/navigation";
import { FC } from "react";
import PrettyJSON from "@/app/ui/PrettyJSON";

const Page: FC<{ params: { id: string } }> = async ({ params }) => {

    const track = await getTrack(params.id);

    if (track === undefined) redirect(config.rootUrl + "/tracks");

    return (
        <div className="track-page">
            <PrettyJSON json={ track } indentation={ 2 } />
        </div>
    );
};

export default Page;
