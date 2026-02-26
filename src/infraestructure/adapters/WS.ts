import WebSocket, { WebSocketServer } from "ws";
import { Server } from "http";

const clients = new Set<WebSocket>();

export function SetUpWS(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    clients.add(ws);

    ws.on("close", () => {
      clients.delete(ws);
    });
  });
}

export function broadcastToAll(data: object) {
  const message = JSON.stringify(data);
  console.log("estoy aqui por ti");
  
  clients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  });
}
