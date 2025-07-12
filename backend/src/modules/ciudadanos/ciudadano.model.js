// src/modules/ciudadanos/ciudadano.model.js
import dbconn from "../../config/dbconeccion.js"; // Importar la conexión a la base de datos

export async function getCiudadanosDB() {
  const [rows] = await dbconn.query("SELECT * FROM ciudadanos WHERE estado < 3");
  return rows;
}

export async function createCiudadanoDB(ciudadanoData) {
  const [result] = await dbconn.query("INSERT INTO ciudadanos SET ?", [ciudadanoData]);
  return result;
}

export async function updateCiudadanoDB(codigo, ciudadanoData) {
  const [result] = await dbconn.query("UPDATE ciudadanos SET ? WHERE codigo = ?", [
    ciudadanoData,
    codigo,
  ]);
  return result;
}

export async function deleteCiudadanoDB(codigo) {
  const [result] = await dbconn.query(
    "UPDATE ciudadanos SET estado = 3 WHERE codigo = ?",
    [codigo]
  );
  return result;
}