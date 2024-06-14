const mongoose = require('mongoose');
//const UsuarioSchema = require("./usuario");



const CursoDetailSchema = new mongoose.Schema({
    title: String,
    url: String,
    description: String,
});



const CursoSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,
    link: String,
    imagem: String,
    cursoDetails: [CursoDetailSchema],
    
});


const Curso = mongoose.model('Curso',CursoSchema);
module.exports = Curso;
