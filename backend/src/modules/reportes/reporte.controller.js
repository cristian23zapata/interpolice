// src/modules/reportes/reporte.controller.js
import { getTopDelitosDB, getTopCiudadanosDB, getTopPlanetasDB } from "./reporte.model.js";

export async function getTopDelitos(req, res) {
  try {
    const data = await getTopDelitosDB();
    res.status(200).json({ status: "ok", data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getTopCiudadanos(req, res) {
  try {
    const data = await getTopCiudadanosDB();
    res.status(200).json({ status: "ok", data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getTopPlanetas(req, res) {
  try {
    const data = await getTopPlanetasDB();
    res.status(200).json({ status: "ok", data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
