/**
 * In-game chat with channels (global, region, party, guild, whisper) and a
 * lightweight profanity filter.
 */
export const CHANNELS = ["global", "region", "party", "guild", "whisper"];

const BLOCKED = ["badword1", "badword2"];

export class ChatSystem {
  constructor() {
    this.history = [];
    this.maxHistory = 200;
  }

  sanitize(text) {
    let out = text;
    for (const word of BLOCKED) {
      out = out.replace(new RegExp(word, "gi"), "*".repeat(word.length));
    }
    return out.slice(0, 240);
  }

  post(channel, from, text) {
    if (!CHANNELS.includes(channel)) channel = "global";
    const msg = { channel, from, text: this.sanitize(text), ts: Date.now() };
    this.history.push(msg);
    if (this.history.length > this.maxHistory) this.history.shift();
    return msg;
  }

  recent(channel, limit = 50) {
    return this.history.filter((m) => m.channel === channel).slice(-limit);
  }
}
