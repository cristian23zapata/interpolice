// src/modules/ciudadanos/ciudadano.controller.js
import {
  getCiudadanosDB,
  createCiudadanoDB,
  updateCiudadanoDB,
  deleteCiudadanoDB,
} from "./ciudadano.model.js";
import { generarQR } from "../../utils/qrUtils.js";

export async function getAllCiudadanos(req, res) {
  try {
    const ciudadanos = await getCiudadanosDB();
    res.status(200).json({
      status: "ok",
      data: ciudadanos,
    });
  } catch (error) {
    console.error('Error al listar ciudadanos:', error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function createCiudadano(req, res) {
  try {
    const codigo = 'C-' + Date.now();
    let datosFormulario = {
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      apodo: req.body.apodo,
      fecha_nacimiento: req.body.fecha_nacimiento,
      planeta_origen: req.body.planeta_origen,
      planeta_residencia: req.body.planeta_residencia,
      foto: req.file ? `/fotos/${req.file.filename}` : null,
      estado: 1
    };

    const codigoQR = await generarQR(datosFormulario, codigo);
    datosFormulario.codigo_qr = codigoQR;

    const resultado = await createCiudadanoDB(datosFormulario);
    
    res.status(201).json({
      status: "ok",
      data: resultado,
      qr: codigoQR,
    });
  } catch (error) {
    console.error('Error al crear ciudadano:', error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function updateCiudadano(req, res) {
  try {
    const { codigo } = req.params;
    const datosFormulario = {
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      apodo: req.body.apodo,
      fecha_nacimiento: req.body.fecha_nacimiento,
      planeta_origen: req.body.planeta_origen,
      planeta_residencia: req.body.planeta_residencia,
    };

    if (req.file) {
      datosFormulario.foto = `/fotos/${req.file.filename}`;
    }

    const nuevoQR = await generarQR(datosFormulario, codigo);
    datosFormulario.codigo_qr = nuevoQR;

    const resultado = await updateCiudadanoDB(codigo, datosFormulario);

    res.status(200).json({
      status: "ok",
      data: resultado,
      qr_actualizado: nuevoQR,
    });
  } catch (error) {
    console.error('Error al actualizar ciudadano:', error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function deleteCiudadano(req, res) {
  try {
    const { codigo } = req.params;
    const resultado = await deleteCiudadanoDB(codigo);
    
    res.status(200).json({
      status: "ok",
      data: resultado,
    });
  } catch (error) {
    console.error('Error al eliminar ciudadano:', error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}