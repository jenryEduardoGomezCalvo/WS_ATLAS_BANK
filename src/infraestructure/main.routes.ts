import { Router } from "express";
import { transferNotify } from "./main_controllers";

export const router = Router();

// Called by your backend when a transfer is completed
router.post("/transfer/notify", transferNotify);
