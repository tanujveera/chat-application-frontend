import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const stompClient = new Client({
  brokerURL: "http://localhost:8080/ws-native",
  reconnectDelay: 5000,

  onDisconnect: () => console.log("❌ Disconnected from WebSocket"),
  onStompError: (frame) => console.error("🚨 STOMP Error:", frame),
});


export default stompClient;
