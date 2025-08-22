import { crearAmonestacionDB, listarAmonestacionesDB } from "./amonestacion.model.js";

export async function crearAmonestacion(req, res) {
  try {
    const { codigo_ciudadano, motivo } = req.body;
    const result = await crearAmonestacionDB(codigo_ciudadano, motivo);
    res.json({ status: "ok", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function listarAmonestaciones(req, res) {
  try {
    const { codigo } = req.params;
    const result = await listarAmonestacionesDB(codigo);
    res.json({ status: "ok", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
