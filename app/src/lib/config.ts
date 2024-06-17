const testConfig = {
    rootUrl: process.env.ROOT_URL,
};

const missingKeys: string[] = [];

Object.entries(testConfig).forEach(([key, value]) => {
    if (value === undefined) missingKeys.push(key);
});

if (missingKeys.length > 0) {
    console.error(`Missing environment variable(s): ${missingKeys.join(", ")}`)
    process.exit(1);
}

const config = {
    rootUrl: process.env.ROOT_URL as string,
};

export default config;
