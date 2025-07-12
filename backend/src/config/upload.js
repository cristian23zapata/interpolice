// importaciones
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configuración de multer
const storage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../fotos')); // carpeta donde se guardan las fotos
},
filename: (req, file, cb) => {
    const uniqueName = `foto_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
},
});

export const upload = multer({ storage });
