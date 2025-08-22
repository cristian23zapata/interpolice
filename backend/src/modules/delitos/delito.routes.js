// src/modules/delitos/delito.routes.js
import express from "express";
import { getAllDelitos, createDelito } from "./delito.controller.js";

const router = express.Router();

router.get("/listartodos", getAllDelitos);
router.post("/crear", createDelito);

export default router;
