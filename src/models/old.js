const mongoose = require('mongoose');

const old = mongoose.Schema({
    
    title:{
        type:String,
        required:true

    },
    url:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true

    },
});

const Curso = mongoose.model('Curso',old);
module.exports = Curso;
