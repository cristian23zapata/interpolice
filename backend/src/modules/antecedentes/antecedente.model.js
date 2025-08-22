// src/modules/antecedentes/antecedente.model.js
import dbconn from "../../config/dbconeccion.js";

export async function createAntecedenteDB(antecedenteData) {
  const [result] = await dbconn.query("INSERT INTO antecedentes SET ?", [antecedenteData]);
  return result;
}

export async function addDelitoToAntecedenteDB(id_antecedente, id_delito) {
  await dbconn.query("INSERT INTO antecedente_delito (id_antecedente, id_delito) VALUES (?, ?)", 
    [id_antecedente, id_delito]);
}

export async function getAntecedentesByCiudadanoDB(codigo_ciudadano) {
  const [rows] = await dbconn.query(
    `SELECT a.id_antecedente, a.fecha, a.hora, a.lugar, a.descripcion,
            GROUP_CONCAT(d.nombre_delito SEPARATOR ', ') AS delitos
     FROM antecedentes a
     LEFT JOIN antecedente_delito ad ON a.id_antecedente = ad.id_antecedente
     LEFT JOIN delitos d ON ad.id_delito = d.id_delito
     WHERE a.codigo_ciudadano = ?
     GROUP BY a.id_antecedente, a.fecha, a.hora, a.lugar, a.descripcion
     ORDER BY a.fecha DESC, a.hora DESC`,
    [codigo_ciudadano]
  );
  return rows;
}
