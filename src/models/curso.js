const mongoose = require('mongoose');
//const UsuarioSchema = require("./usuario");

const CursoSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,
    link: String,
    imagem: String,
    //usuariosInscritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
    
});


const Curso = mongoose.model('Curso',CursoSchema);
module.exports = Curso;
//module.exports = mongoose.model('Curso', CursoSchema);