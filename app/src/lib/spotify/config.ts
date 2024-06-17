const spotifyTestConfig = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    scopes: process.env.SPOTIFY_SCOPES,
}

const missingKeys: string[] = [];

Object.entries(spotifyTestConfig).forEach(([key, value]) => {
    if (value === undefined) missingKeys.push(key);
});

if (missingKeys.length > 0) {
    console.error(`Missing Spotify environment variable(s): ${missingKeys.join(", ")}`)
    process.exit(1);
}

const spotifyConfig = {
    clientId: process.env.SPOTIFY_CLIENT_ID as string,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI as string,
    scopes: (process.env.SPOTIFY_SCOPES as string).split(" "),
};

export default spotifyConfig;
