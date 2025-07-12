// src/modules/usuarios/usuario.model.js
import dbconn from "../../config/dbconeccion.js";

export async function getUsuariosDB() {
  const [rows] = await dbconn.query("SELECT * FROM usuarios");
  return rows;
}

export async function createUsuarioDB(usuarioData) {
  const [result] = await dbconn.query("INSERT INTO usuarios SET ?", [usuarioData]);
  return result;
}

export async function updateUsuarioDB(id, usuarioData) {
  const [result] = await dbconn.query("UPDATE usuarios SET ? WHERE id = ?", [
    usuarioData,
    id,
  ]);
  return result;
}

export async function deleteUsuarioDB(id) {
  const [result] = await dbconn.query(
    "UPDATE usuarios SET estado = 3 WHERE id = ?",
    [id]
  );
  return result;
}

export async function getUsuarioByUsernameDB(username) {
  const [rows] = await dbconn.query("SELECT * FROM usuarios WHERE user_name = ?", [username]);
  return rows[0];
}