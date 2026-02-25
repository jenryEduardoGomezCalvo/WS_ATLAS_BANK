export interface Transfer {
  transferId: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  currency: string;
  status: "success" | "failed" | "pending";
  timestamp: string;
}
