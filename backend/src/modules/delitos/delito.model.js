// src/modules/delitos/delito.model.js
import dbconn from "../../config/dbconeccion.js";

export async function getDelitosDB() {
    const [rows] = await dbconn.query("SELECT * FROM delitos");
    return rows;
}

export async function createDelitoDB(delitoData) {
    const [result] = await dbconn.query("INSERT INTO delitos SET ?", [delitoData]);
    return result;
}
