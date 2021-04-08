
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');


const multerOptions = {
    storage:multer.memoryStorage(), // salva na memoria primeiro
    fileFilter:(req, file, next)=>{
        const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
        if(allowed.includes(file.mimetype)){
            next(null, true);
        } else {
            next({message:'Arquivo nao suportado'}, false);
        }
    }
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) =>{
    if(!req.file){ // se nao tiver o arquivo da foto 
        next();
        return;
    }

    const extension = req.file.mimetype.split('/')[1]; // pega a posição 1 do array (a extensao da imagem) 
    let fileName = `${uuid.v4()}.${extension}`;
    req.body.photo = fileName;

    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO); // tamanho da foto
    await photo.write(`./public/media/${fileName}`);//local da foto salva
    next();
};