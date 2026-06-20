/**
 * Regional realm server endpoints. Players are routed to the realm with the
 * lowest latency, or may pick one manually from the launcher.
 */
export const REGIONS = {
  us: {
    id: "us",
    label: "Americas (US-East)",
    ws: "wss://us.worldofcrypto.example/realm",
    http: "https://us.worldofcrypto.example",
  },
  eu: {
    id: "eu",
    label: "Europe (EU-Central)",
    ws: "wss://eu.worldofcrypto.example/realm",
    http: "https://eu.worldofcrypto.example",
  },
};

export const DEFAULT_REGION = "us";
