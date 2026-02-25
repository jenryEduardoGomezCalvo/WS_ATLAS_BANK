import { Request, Response } from "express";
import { notifyClient } from "./adapters/WS";
import { Transfer } from "./types/transfer";

export async function transferNotify(req: Request, res: Response) {
  const transfer: Transfer = req.body;

  const { transferId, fromAccount, toAccount, amount, currency, status, timestamp } = transfer;

  if (!transferId || !fromAccount || !toAccount || !amount || !currency || !status || !timestamp) {
    res.status(400).json({ message: "Missing required transfer fields" });
    return;
  }

  const delivered = notifyClient(toAccount, transfer);

  if (delivered) {
    res.status(200).json({ message: "Notification sent", toAccount });
  } else {
    // Client not connected — you may queue the notification here if needed
    res.status(202).json({ message: "Transfer recorded but client is not connected", toAccount });
  }
}
