/**
 * Wire protocol shared between the client and the regional realm servers.
 * Messages are JSON-encoded for readability; swap to a binary codec for
 * production traffic if bandwidth becomes a concern.
 */
export const MESSAGE = {
  STATE: "state",
  SNAPSHOT: "snapshot",
  JOIN: "join",
  LEAVE: "leave",
  CHAT: "chat",
};

export function encode(obj) {
  return JSON.stringify(obj);
}

export function decode(data) {
  if (typeof data === "string") return JSON.parse(data);
  return JSON.parse(new TextDecoder().decode(data));
}
