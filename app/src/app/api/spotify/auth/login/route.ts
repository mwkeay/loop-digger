import spotifyConfig from "@/app/lib/spotify/config";

export const GET = async (request: Request) => {

    const url = `https://accounts.spotify.com/authorize?response_type=code`
        + `&client_id=${spotifyConfig.clientId}`
        + `&scope=${encodeURIComponent(spotifyConfig.scopes.join(" "))}`
        + `&redirect_uri=${encodeURIComponent(spotifyConfig.redirectUri)}`

    return Response.redirect(url);
};
