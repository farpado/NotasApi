const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    name: String,
    size: Number,
    file: String, // esse que nois precisa vai salvar o nome da imagem
    createAt: {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model("Post", PostSchema)