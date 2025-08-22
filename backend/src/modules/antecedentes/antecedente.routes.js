// src/modules/antecedentes/antecedente.routes.js
import express from "express";
import { createAntecedente, getAntecedentesByCiudadano } from "./antecedente.controller.js";

const router = express.Router();

router.post("/crear", createAntecedente);
router.get("/ciudadano/:codigo", getAntecedentesByCiudadano);

export default router;
