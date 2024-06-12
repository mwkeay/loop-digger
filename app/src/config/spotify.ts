const config = {
    clientId: process.env.SPOTIFY_CLIENT_ID as string,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI as string,
    scopes: (process.env.SPOTIFY_SCOPES as string).split(" "),
};

Object.entries(config).forEach((key, value) => {
    if (value === undefined) console.error(`${key} not defined in environment configuration.`);
});

export default config;
