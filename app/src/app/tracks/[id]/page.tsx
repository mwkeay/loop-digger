"use server";

import "@/styles/tracks.css";
import getTrack from "@/app/actions/getTrack";
import config from "@/lib/config";
import { redirect } from "next/navigation";
import { FC } from "react";
import PrettyJSON from "@/components/PrettyJSON";

const Page: FC<{ params: { id: string } }> = async ({ params }) => {

    const track = await getTrack(params.id);

    if (track === undefined) redirect(config.rootUrl + "/tracks");

    return (
        <div className="track-page">

            <div>
                <h1>{ track.name }</h1>
                <p>{ track.artists.map(artist => artist.name).join(", ") }</p>
            </div>

            <PrettyJSON json={ track } indentation={ 2 } />
            
        </div>
    );
};

export default Page;
