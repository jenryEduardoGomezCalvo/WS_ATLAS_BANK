import WebSocket, { WebSocketServer } from "ws";
import { Server } from "http";
import { Transfer } from "../types/transfer";

// Map: accountId -> WebSocket connection
const clients = new Map<string, WebSocket>();

export function SetUpWS(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    let accountId: string | null = null;

    ws.on("message", (data) => {
      try {
        const msg = JSON.parse(data.toString());

        // First message must be { type: "register", accountId: "..." }
        if (msg.type === "register" && msg.accountId) {
          accountId = msg.accountId as string;
          clients.set(accountId!, ws);
          console.log(`Client registered for account: ${accountId}`);

          ws.send(JSON.stringify({ type: "registered", accountId }));
        }
      } catch {
        ws.send(JSON.stringify({ type: "error", message: "Invalid JSON" }));
      }
    });

    ws.on("close", () => {
      if (accountId) {
        clients.delete(accountId);
        console.log(`Client disconnected: ${accountId}`);
      }
    });
  });
}

export function notifyClient(accountId: string, transfer: Transfer): boolean {
  const client = clients.get(accountId);

  if (!client || client.readyState !== WebSocket.OPEN) {
    return false;
  }

  client.send(
    JSON.stringify({
      type: "transfer_notification",
      data: transfer,
    })
  );

  return true;
}
