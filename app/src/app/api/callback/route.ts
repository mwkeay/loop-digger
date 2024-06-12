import { authCodeFlow } from "@/app/actions/authCodeFlow";

export const GET = (request: Request) => {

    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (code) authCodeFlow(code);
    else console.error("No authorization code found in callback search params.");

    return Response.redirect(process.env.SERVER_URL);
};
