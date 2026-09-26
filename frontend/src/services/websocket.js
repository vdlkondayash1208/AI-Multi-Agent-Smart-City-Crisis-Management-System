import { io } from 'socket.io-client';

const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:5000';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    if (this.socket) return;
    
    const userStr = localStorage.getItem('user');
    let token = '';
    if (userStr) {
      token = JSON.parse(userStr).token;
    }

    this.socket = io(WS_URL, {
      auth: { token },
      autoConnect: true
    });

    this.socket.on('connect', () => console.log('WS Connected'));
    this.socket.on('disconnect', () => console.log('WS Disconnected'));

    // Global listener setup
    this.socket.onAny((event, ...args) => {
      if (this.listeners.has(event)) {
        this.listeners.get(event).forEach(cb => cb(...args));
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

const wsService = new WebSocketService();
export default wsService;
