// src/modules/usuarios/usuario.controller.js
import bcrypt from 'bcrypt';

import {
  getUsuariosDB,
  createUsuarioDB,
  updateUsuarioDB,
  deleteUsuarioDB,
  getUsuarioByUsernameDB
} from "./usuario.model.js";

const SALT_ROUNDS = 10;

export async function getAllUsuarios(req, res) {
  try {
    const usuarios = await getUsuariosDB();
    res.status(200).json({
      status: "ok",
      data: usuarios,
    });
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function createUsuario(req, res) {
  try {
    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    const usuarioData = {
      user_name: req.body.user_name,
      password: hashedPassword, // Guardamos la contraseña hasheada
      monitor_scompute: req.body.monitor_scompute,
      estado: 1
    };

    const resultado = await createUsuarioDB(usuarioData);
    
    res.status(201).json({
      status: "ok",
      data: {
        id: resultado.insertId,
        user_name: usuarioData.user_name,
        monitor_scompute: usuarioData.monitor_scompute
      },
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function updateUsuario(req, res) {
  try {
    const { id } = req.params;
    const usuarioData = {
      user_name: req.body.user_name,
      monitor_scompute: req.body.monitor_scompute
    };

    // Solo actualiza la contraseña si se proporciona
    if (req.body.password) {
      usuarioData.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    }

    const resultado = await updateUsuarioDB(id, usuarioData);

    res.status(200).json({
      status: "ok",
      data: {
        id,
        user_name: usuarioData.user_name,
        monitor_scompute: usuarioData.monitor_scompute
      },
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function deleteUsuario(req, res) {
  try {
    const { id } = req.params;
    const resultado = await deleteUsuarioDB(id);
    
    res.status(200).json({
      status: "ok",
      data: resultado,
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function loginUsuario(req, res) {
  try {
    const { user_name, password } = req.body;
    const usuario = await getUsuarioByUsernameDB(user_name);
    
    if (!usuario) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    const token = generarToken(usuario[0], process.env.TOKEN_LIFE);
    console.log("Token generado:", token);


    // Comparar la contraseña proporcionada con el hash almacenado
    const passwordMatch = await bcrypt.compare(password, usuario.password);
    
    if (!passwordMatch) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales inválidas",
      });
    }

    res.status(200).json({
      status: "ok",
      data: {
        id: usuario.id,
        user_name: usuario.user_name,
        monitor_scompute: usuario.monitor_scompute
      },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}