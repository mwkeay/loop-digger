"use server";

import "@/styles/playlists.css";
import getPlaylist from "@/app/actions/getPlaylist";
import { redirect } from "next/navigation";
import { FC } from "react";
import { TrackItem } from "@/components/tracks";

const Page: FC<{ params: { id: string } }> = async ({ params }) => {

    const playlist = await getPlaylist(params.id);

    if (playlist === undefined) redirect("/playlist");

    return (
        <main className="playlist-page">
            <h1>{ playlist.name }</h1>

            <div className="playlist-page-list">
                { playlist.tracks.items.map((item, index) => {

                    if (item.track.type !== "track") return null;
                    const track = item.track as Track;

                    return (
                        <TrackItem track={ track } key={ index } />
                    )
                }) }
            </div>
        </main>
    );
};

export default Page;
