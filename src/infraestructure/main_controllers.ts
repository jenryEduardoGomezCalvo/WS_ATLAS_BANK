import { Request, Response } from "express";
import { broadcastToAll } from "./adapters/WS";

export async function transferNotify(req: Request, res: Response) {
  const { success } = req.body;

  if (success !== true) {
    res.status(400).json({ message: "success must be true" });
    return;
  }

  broadcastToAll({ type: "transfer_update" });

  res.status(200).json({ message: "Broadcast sent" });
}
