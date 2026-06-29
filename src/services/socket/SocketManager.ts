type SocketMessageHandler = (data: any) => void;

class SocketManager {
  private static instance: SocketManager;
  private socket: WebSocket | null = null;
  private listeners: Map<string, Set<SocketMessageHandler>> = new Map();
  private isConnected = false;

  private constructor() {}

  static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  connect(url: string) {
    if (this.socket || this.isConnected) return;

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      this.isConnected = true;
      console.log('WebSocket Connected');
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Assuming Binance-like structure where event type is 'e'
        const eventType = data.e || 'message';
        this.notifyListeners(eventType, data);
      } catch (error) {
        console.error('WebSocket Message Parse Error', error);
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error', error);
    };

    this.socket.onclose = () => {
      this.isConnected = false;
      this.socket = null;
      console.log('WebSocket Disconnected. Reconnecting...');
      // Implement backoff logic here in production
      setTimeout(() => this.connect(url), 5000);
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.isConnected = false;
    }
  }

  subscribe(event: string, handler: SocketMessageHandler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(handler);
  }

  unsubscribe(event: string, handler: SocketMessageHandler) {
    this.listeners.get(event)?.delete(handler);
  }

  private notifyListeners(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(handler => handler(data));
    }
  }
}

export const socketManager = SocketManager.getInstance();
