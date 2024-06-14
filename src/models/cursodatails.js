const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,
    link: String,
    imagem: String,
    //usuariosInscritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
    
});


const Curso = mongoose.model('Curso',CursoSchema);
module.exports = Curso;