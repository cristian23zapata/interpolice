// src/modules/usuarios/usuario.routes.js
import express from "express";
import {
  getAllUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario
} from "./usuario.controller.js";

const router = express.Router();

// Rutas para Usuarios
router.get("/listartodos", getAllUsuarios);
router.post("/crear", createUsuario);
router.put("/actualizar/:id", updateUsuario);
router.put("/eliminar/:id", deleteUsuario);
router.post("/login", loginUsuario);

export default router;