"use server";

import { Me } from "@/types/spotify/users";
import { cookies } from "next/headers";
import { getRawDbAccessToken } from "../lib/spotify/auth/authorization-code-flow";

const apiTest = async (): Promise<Me | undefined> => {

    let userId: string;
    let accessToken: string;

    // =====================
    //     Check Cookies
    // =====================

    try {
        const userIdCookie = cookies().get("loopdigger_user_id");
        if (userIdCookie === undefined) throw new Error ("No loopdigger_user_id cookie found.");
        else userId = userIdCookie.value;
    }

    catch (error) {
        console.error("apiTest failed to retrieve user ID cookie.", error);
        return;
    }

    // ========================
    //     Get Access Token
    // ========================

    try {
        accessToken = await getRawDbAccessToken(userId);
    }

    catch (error) {
        console.error("apiTest failed to retrieve access token.", error);
        return;
    }

    // ===============
    //     GET /me
    // ===============

    try {
        const meResponse = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        if (!meResponse.ok) {
            throw new Error("Spotify GET /me failed with status: " + meResponse.status);
        }

        const me: Me = await meResponse.json();

        return me;
    }

    catch (error) {
        console.error("Spoify GET /me failed.", error);
        return;
    }

};

export default apiTest;
