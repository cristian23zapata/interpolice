// src/modules/reportes/reporte.model.js
import dbconn from "../../config/dbconeccion.js";

// Delitos más frecuentes
export async function getTopDelitosDB() {
  const [rows] = await dbconn.query(
    `SELECT d.nombre_delito, COUNT(ad.id_delito) AS total
     FROM delitos d
     JOIN antecedente_delito ad ON d.id_delito = ad.id_delito
     GROUP BY d.nombre_delito
     ORDER BY total DESC`
  );
  return rows;
}

// Ciudadanos con más delitos
export async function getTopCiudadanosDB() {
  const [rows] = await dbconn.query(
    `SELECT c.codigo, c.nombre, c.apellidos, COUNT(ad.id_delito) AS total_delitos
     FROM ciudadanos c
     JOIN antecedentes a ON c.codigo = a.id_ciudadano
     JOIN antecedente_delito ad ON a.id_antecedente = ad.id_antecedente
     GROUP BY c.codigo, c.nombre, c.apellidos
     ORDER BY total_delitos DESC`
  );
  return rows;
}

// Planetas con más delitos (residencia)
export async function getTopPlanetasDB() {
  const [rows] = await dbconn.query(
    `SELECT c.planeta_residencia, COUNT(ad.id_delito) AS total_delitos
     FROM ciudadanos c
     JOIN antecedentes a ON c.codigo = a.id_ciudadano
     JOIN antecedente_delito ad ON a.id_antecedente = ad.id_antecedente
     GROUP BY c.planeta_residencia
     ORDER BY total_delitos DESC`
  );
  return rows;
}
