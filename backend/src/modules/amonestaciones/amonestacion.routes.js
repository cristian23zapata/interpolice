import express from "express";
import { crearAmonestacion, listarAmonestaciones } from "./amonestacion.controller.js";

const router = express.Router();

router.post("/crear", crearAmonestacion);
router.get("/ciudadano/:codigo", listarAmonestaciones);

export default router;
