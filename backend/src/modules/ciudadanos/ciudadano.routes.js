// src/modules/ciudadanos/ciudadano.routes.js
import express from "express";
import {
  getAllCiudadanos,
  createCiudadano,
  updateCiudadano,
  deleteCiudadano,
} from "./ciudadano.controller.js";
import { upload } from "../../config/upload.js";
import { generarQR } from "../../utils/qrUtils.js";

const router = express.Router();

// Rutas para Ciudadanos
router.get("/listartodos", getAllCiudadanos);
router.post("/crear", upload.single('foto'), createCiudadano);
router.put("/actualizar/:codigo", upload.single('foto'), updateCiudadano);
router.put("/eliminar/:codigo", deleteCiudadano);

export default router;