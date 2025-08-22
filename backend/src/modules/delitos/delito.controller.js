// src/modules/delitos/delito.controller.js
import { getDelitosDB, createDelitoDB } from "./delito.model.js";

export async function getAllDelitos(req, res) {
  try {
    const delitos = await getDelitosDB();
    res.status(200).json({ status: "ok", data: delitos });
  } catch (error) {
    console.error("Error al listar delitos:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function createDelito(req, res) {
  try {
    const delitoData = {
      nombre_delito: req.body.nombre_delito,
      descripcion_legal: req.body.descripcion_legal,
      gravedad: req.body.gravedad || "medio"
    };

    const result = await createDelitoDB(delitoData);
    res.status(201).json({
      status: "ok",
      data: { id: result.insertId, ...delitoData }
    });
  } catch (error) {
    console.error("Error al crear delito:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}
