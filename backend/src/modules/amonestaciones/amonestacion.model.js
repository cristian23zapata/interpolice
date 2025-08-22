import dbconn from "../../config/dbconeccion.js";

export async function crearAmonestacionDB(codigo_ciudadano, descripcion) {
  // contar cuántas amonestaciones tiene
  const [countRows] = await dbconn.query(
    "SELECT COUNT(*) as total FROM amonestaciones WHERE codigo_ciudadano = ?",
    [codigo_ciudadano]
  );

  const nivel = countRows[0].total + 1;
  let sancion = "";

  if (nivel === 1) {
    sancion = "Multa $400 + Curso 48h normas cívicas";
  } else if (nivel === 2) {
    sancion = "Multa $400 + Curso 48h + 2 días trabajo cívico";
  } else if (nivel >= 3) {
    sancion = "Multa $400 + Curso 48h + 2 días trabajo cívico + 8 días cárcel";

    // Registrar también en antecedentes
    await dbconn.query(
      `INSERT INTO antecedentes (codigo_ciudadano, fecha, hora, lugar, descripcion) 
       VALUES (?, CURDATE(), CURTIME(), 'Lugar no especificado', ?)`,
      [codigo_ciudadano, descripcion]
    );
  }

  // Insertar en tabla amonestaciones
  const [result] = await dbconn.query(
    `INSERT INTO amonestaciones (codigo_ciudadano, fecha, descripcion, nivel, sancion) 
     VALUES (?, CURDATE(), ?, ?, ?)`,
    [codigo_ciudadano, descripcion, nivel, sancion]
  );

  return { id: result.insertId, nivel, sancion };
}

export async function listarAmonestacionesDB(codigo_ciudadano) {
  const [rows] = await dbconn.query(
    `SELECT id_amonestacion, fecha, descripcion, nivel, sancion 
     FROM amonestaciones 
     WHERE codigo_ciudadano = ? 
     ORDER BY fecha DESC`,
    [codigo_ciudadano]
  );
  return rows;
}
