import express from "express";
import { router } from "./infraestructure/main.routes";

export const app = express();

app.use(express.json());
app.use(router);
