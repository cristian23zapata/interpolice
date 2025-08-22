// src/modules/antecedentes/antecedente.controller.js
import { createAntecedenteDB, addDelitoToAntecedenteDB, getAntecedentesByCiudadanoDB } from "./antecedente.model.js";

export async function createAntecedente(req, res) {
  try {
    const { codigo_ciudadano, fecha, hora, lugar, descripcion, delitos } = req.body;

    // Crear antecedente
    const antecedenteData = { codigo_ciudadano, fecha, hora, lugar, descripcion };
    const result = await createAntecedenteDB(antecedenteData);

    // Asociar delitos si vienen
    if (Array.isArray(delitos)) {
      for (const idDelito of delitos) {
        await addDelitoToAntecedenteDB(result.insertId, idDelito);
      }
    }

    res.status(201).json({
      status: "ok",
      data: { id: result.insertId, ...antecedenteData, delitos }
    });
  } catch (error) {
    console.error("Error al crear antecedente:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getAntecedentesByCiudadano(req, res) {
  try {
    const { codigo } = req.params;
    const antecedentes = await getAntecedentesByCiudadanoDB(codigo);
    res.status(200).json({ status: "ok", data: antecedentes });
  } catch (error) {
    console.error("Error al obtener antecedentes:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}
