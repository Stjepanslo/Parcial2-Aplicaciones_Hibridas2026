import multer from "multer"
import sharp from "sharp"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"
import { unlink } from "fs/promises"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configurar almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "../uploads")
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const nombreArchivo = `${Date.now()}-${file.originalname}`
        cb(null, nombreArchivo)
    }
})

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"]
        if (tiposPermitidos.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Solo se permiten imágenes (JPEG, PNG, WebP)"))
        }
    }
})

export async function resizeImage(req, res, next) {
    if (!req.file) {
        return next()
    }

    try {
        const filename = `${Date.now()}-resized.webp`
        const filepath = path.join(__dirname, "../uploads", filename)

        await sharp(req.file.path)
            .resize(400, 225, { fit: "cover" })
            .webp()
            .toFile(filepath)

        // Eliminar archivo original
        fs.unlinkSync(req.file.path)

        // Guardar nueva ruta en req
        req.file.filename = filename
        req.file.url = `/uploads/${filename}`
        req.file.path = path.join(__dirname, "../uploads", filename)

        next()
    } catch (error) {
        res.status(400).json({ message: "Error al procesar imagen" })
    }
}



export async function deleteImage(imagePath) {
    try {
        if (!imagePath) return
        
        // Extraer nombre del archivo de la URL
        const filename = imagePath.split('/').pop()
        const filepath = path.join(__dirname, "../uploads", filename)
        
        await unlink(filepath)
        console.log("Imagen eliminada:", filename)
    } catch (error) {
        console.log("Error al eliminar imagen:", error)
        // No lanzar error, solo loguear
    }
}

export default upload