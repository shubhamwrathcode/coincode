type SocketMessageHandler = (data: any) => void;

interface ConnectOptions {
  /** Force reconnect even if a socket exists */
  force?: boolean;
  protocols?: string | string[];
}

/**
 * Exchange-grade WebSocket manager (singleton).
 * Point ENV.WS_BASE_URL at AGCE stream when available.
 */
class SocketManager {
  private static instance: SocketManager;
  private socket: WebSocket | null = null;
  private listeners: Map<string, Set<SocketMessageHandler>> = new Map();
  private url: string | null = null;
  private isConnected = false;
  private shouldReconnect = true;
  private reconnectAttempt = 0;
  private maxReconnectDelay = 30000;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;

  private constructor() {}

  static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  get connected() {
    return this.isConnected;
  }

  connect(url: string, options: ConnectOptions = {}) {
    if (!url) return;
    if (this.socket && this.isConnected && !options.force && this.url === url) {
      return;
    }

    this.shouldReconnect = true;
    this.url = url;

    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    this.socket = new WebSocket(url, options.protocols);

    this.socket.onopen = () => {
      this.isConnected = true;
      this.reconnectAttempt = 0;
      this.startHeartbeat();
      this.notifyListeners('_open', { connected: true });
    };

    this.socket.onmessage = (event) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        const eventType = data?.e || data?.event || data?.type || 'message';
        this.notifyListeners(eventType, data);
        this.notifyListeners('message', data);
      } catch {
        this.notifyListeners('message', event.data);
      }
    };

    this.socket.onerror = () => {
      this.notifyListeners('_error', { connected: false });
    };

    this.socket.onclose = () => {
      this.isConnected = false;
      this.socket = null;
      this.stopHeartbeat();
      this.notifyListeners('_close', { connected: false });

      if (this.shouldReconnect && this.url) {
        const delay = Math.min(
          1000 * 2 ** this.reconnectAttempt,
          this.maxReconnectDelay,
        );
        this.reconnectAttempt += 1;
        setTimeout(() => {
          if (this.shouldReconnect && this.url) {
            this.connect(this.url);
          }
        }, delay);
      }
    };
  }

  disconnect() {
    this.shouldReconnect = false;
    this.stopHeartbeat();
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.isConnected = false;
  }

  send(payload: unknown) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return false;
    this.socket.send(typeof payload === 'string' ? payload : JSON.stringify(payload));
    return true;
  }

  /** Subscribe to a channel/topic if backend expects an explicit sub message */
  subscribeChannel(channel: string, params?: Record<string, unknown>) {
    return this.send({ method: 'SUBSCRIBE', channel, ...params });
  }

  unsubscribeChannel(channel: string, params?: Record<string, unknown>) {
    return this.send({ method: 'UNSUBSCRIBE', channel, ...params });
  }

  subscribe(event: string, handler: SocketMessageHandler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(handler);
    return () => this.unsubscribe(event, handler);
  }

  unsubscribe(event: string, handler: SocketMessageHandler) {
    this.listeners.get(event)?.delete(handler);
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      this.send({ method: 'PING', ts: Date.now() });
    }, 20000);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private notifyListeners(event: string, data: any) {
    this.listeners.get(event)?.forEach((handler) => handler(data));
  }
}

export const socketManager = SocketManager.getInstance();
