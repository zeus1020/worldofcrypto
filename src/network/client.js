import { encode, decode, MESSAGE } from "./protocol.js";

/**
 * WebSocket client that connects to the nearest regional realm server
 * (US or Europe) and syncs player state with other online players.
 */
export class NetworkClient {
  constructor(region = "auto") {
    this.region = region;
    this.socket = null;
    this.players = new Map();
    this.connected = false;
    this.handlers = {};
  }

  connect(url) {
    this.socket = new WebSocket(url);
    this.socket.binaryType = "arraybuffer";

    this.socket.onopen = () => {
      this.connected = true;
      this.emit("open");
    };
    this.socket.onclose = () => {
      this.connected = false;
      this.emit("close");
    };
    this.socket.onmessage = (ev) => this.onMessage(decode(ev.data));
  }

  onMessage(msg) {
    switch (msg.type) {
      case MESSAGE.SNAPSHOT:
        for (const p of msg.players) this.players.set(p.id, p);
        break;
      case MESSAGE.LEAVE:
        this.players.delete(msg.id);
        break;
      default:
        this.emit(msg.type, msg);
    }
  }

  sendState(state) {
    if (!this.connected) return;
    this.socket.send(encode({ type: MESSAGE.STATE, ...state }));
  }

  on(event, fn) {
    this.handlers[event] = fn;
  }

  emit(event, data) {
    if (this.handlers[event]) this.handlers[event](data);
  }
}
