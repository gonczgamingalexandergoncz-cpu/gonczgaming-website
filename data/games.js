// Shared across every game
const KOFI_BASE_URL = "https://ko-fi.com/gonczgaming";

// Static Forms — one form per stage, the game name is sent in a hidden field
const SIGNUP_ENDPOINT = "https://api.staticforms.xyz/submit";
const ALPHA_FORM_ID = "sf_d0fca28a9e17716100f32d15";
const BETA_FORM_ID = "sf_06053a03c3340b9e3e44ef55";

const games = [
    {
        name: "Logistics Empire",
        slug: "logistics-empire",
        active: false,
        sortOrder: 3,
        downloadReady: false,
        alphaOpen: false,
        betaOpen: false,
        steamAppId: null,
    },
    {
        name: "Alcertha",
        slug: "alcertha",
        active: true,
        sortOrder: 2,
        downloadReady: false,
        alphaOpen: false,
        betaOpen: false,
        steamAppId: null,
    },
    {
        name: "Strataforge Idle",
        slug: "strataforge-idle",
        active: true,
        sortOrder: 1,
        downloadReady: true,
        alphaOpen: true,
        betaOpen: false,
        steamAppId: 00000,
    },
];
