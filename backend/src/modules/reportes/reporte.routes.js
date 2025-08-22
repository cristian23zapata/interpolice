// src/modules/reportes/reporte.routes.js
import express from "express";
import { getTopDelitos, getTopCiudadanos, getTopPlanetas } from "./reporte.controller.js";

const router = express.Router();

router.get("/top-delitos", getTopDelitos);
router.get("/top-ciudadanos", getTopCiudadanos);
router.get("/top-planetas", getTopPlanetas);

export default router;
