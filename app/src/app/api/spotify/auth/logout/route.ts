import config from "@/lib/config";
import { cookies } from "next/headers";

export const GET = async (request: Request) => {

    const store = cookies();
    store.delete("loopdigger_user_id");
    store.delete("loopdigger_spotify_user_id");

    return Response.redirect(config.rootUrl);
};
