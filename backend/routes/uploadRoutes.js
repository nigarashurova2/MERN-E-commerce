import path from "path"
import express from "express"
import multer from "multer"
import fs from "fs"

const uploadDir = "uploads"
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb)=>{
        const extname = path.extname(file.originalname)
        cb(null, `${file.fieldname}-${Date.now()}${extname}`)
    }
})

const fileFilter = (req, file, cb)=>{
    const filetypes = /\.(jpe?g|png|webp)$/i;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase()
    const mimeType = file.mimetype

    if(filetypes.test(extname) && mimetypes.test(mimeType)){
        cb(null, true)
    }else{
        cb(new Error("Images only"), false)
    }
}

const upload = multer({storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } })
const uploadSingleImage = upload.single('image')


router.post('/', (req, res)=>{
    uploadSingleImage(req, res, (err)=>{
        if(err){
            res.status(400).send({message: err.message})
        }else if(req.file) {
            res.status(200).send({
                message: "Image uploaded successfully",
                image: `/${req.file.path}`
            })
        }else{
            res.status(400).send({message: "No image file provided"})
        }
    })
})

export default router