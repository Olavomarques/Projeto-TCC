import express from "express";
import { chatIA } from "./controllers/mensagem.js";

const router = express.Router();

router.post("/chat", chatIA);

export default router;