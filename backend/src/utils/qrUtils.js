import path, { dirname } from 'path';
import fs from 'fs';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Función para generar el código QR
export const generarQR = async (data, codigo) => {
    // Contenido del QR
    const qrContent = `CIUDADANO INTERGALÁCTICO\n` +
                    `Código: ${codigo}\n` +
                    `Nombre: ${data.nombre} ${data.apellidos}\n` +
                    `Apodo: ${data.apodo || 'N/A'}\n` +
                    `Nacimiento: ${data.fecha_nacimiento}\n` +
                    `Origen: ${data.planeta_origen}\n` +
                    `Residencia: ${data.planeta_residencia}`;

    // Nombre de archivo y ruta donde guardar
    const fileName = `ciudadano_${codigo}.png`;
    const qrDir = path.join(__dirname, '..', '__qrcodes');

    // Asegurarse de que la carpeta exista
    if (!fs.existsSync(qrDir)) {
        fs.mkdirSync(qrDir, { recursive: true });
    }

    const qrPath = path.join(qrDir, fileName);

    // Generar el archivo QR
    await QRCode.toFile(qrPath, qrContent, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 300
    });

    // Devolver la ruta pública para acceder al QR
    return `/qr/${fileName}`;
};

export default generarQR;
