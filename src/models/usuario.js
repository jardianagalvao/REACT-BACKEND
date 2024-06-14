
const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    usertype: String,
    cursosInscritos: [String],// [{ type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }],
    meusCursos: { type: Array, default: [] }
});


const Usuario = mongoose.model('Usuario',UsuarioSchema);
module.exports = Usuario;
//module.exports = mongoose.model('Usuario', UsuarioSchema);
