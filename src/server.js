const express = require('express') 
const mongoose = require('mongoose') 
const cors = require('cors'); 
const Usuario = require('./models/usuario')
//const UsuarioSchema = require('./models/usuario')
const bodyParser = require('body-parser');
const Curso = require('./models/curso');
const { ObjectId } = require('mongodb');
//const CursoSchema = require('./models/curso');


const app = express() 

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



// Chame a função com o ID do usuário e o título do curso que você deseja buscar
const usuarioId = 'ID_DO_USUARIO'; // Substitua pelo ID do usuário
const tituloCurso = 'HTML'; // Substitua pelo título ou parte do título do curso
//buscarCursosInscritosPorTitulo(usuarioId, tituloCurso);





// Rotas usuarios
app.post('/usuario', async(req, res) => {
  try {
    const novoUsuario =  await Usuario.create(req.body);
    // res.status(200).json(Usuario);
    res.status(201).json(novoUsuario);
  }catch (error) {
    console.log('Erro na requisição POST /usuarios:', error);
    res.status(500).json({message: error.message})

  }
})


// RETORNA O USUÁRIO A PARTIR DO EMAIL INSERIDO 
app.get('/usuario', async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).send('Email é obrigatório.');
  }

  try {
    const usuario = await Usuario.findOne({ email });

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).send('Usuário não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).send('Erro ao buscar usuário.');
  }
});



//RETORNA TODOS OS USUÁRIOS
app.get('/usuarios', async (req, res) => { 
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro na requisição GET /usuarios:', error);
    res.status(500).json({ message: error.message });
  }
});




app.put('/usuarios/:id', async(req, res) => {
  const {id} = req.params;
  try {
    console.log(req.body)
    //const user = {...req.body, _id: new ObjectId(req.body.id)};
    const usuario = await Usuario.findByIdAndUpdate(id, req.body);
    res.status(200).json(usuario);

  }catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})

  }
})

app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error('Erro na requisição DELETE /usuarios/:id:', error);
    res.status(500).json({ message: error.message });
  }
});




// Rotas Cursos

app.post('/cursos', async(req, res) => {
  try {
    console.log(req.body)
    const curso = await Curso.create(req.body);
    res.status(200).json(curso);

  }catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})

  }
})

app.get('/cursos', async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.status(200).send(cursos);
  } catch (error) {
    console.error('Erro na requisição GET /cursos:', error);
    res.status(500).send(error.message);
  }
});


app.delete('/cursos/:id', async (req, res) => {
  try {
    const { title } = req.body; 
    const curso = await Curso.findOneAndDelete({ title }); 

    if (!curso) {
      return res.status(404).json({ message: 'Curso não encontrado' }); 
    }

    res.status(200).json({ message: 'Curso excluído com sucesso' }); 
  } catch (error) {
    console.error('Erro na requisição DELETE /cursos:', error);
    res.status(500).json({ message: error.message }); 
  }
});


app.put('/cursos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await Curso.findByIdAndUpdate(id, req.body, { new: true });
    if (!curso) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }
    res.status(200).json(curso);
  } catch (error) {
    console.error('Erro na requisição PUT /cursos/:id:', error);
    res.status(500).json({ message: error.message });
  }
});


app.get('/cursos/:id', async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id).populate('cursoDetails');
    if (!curso) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }
    res.status(200).json(curso);
  } catch (error) {
    console.error('Erro na requisição GET /cursos/:id:', error);
    res.status(500).json({ message: error.message });
  }
});



// Rotas Cursosxarope

app.post('/Cursosxarope', async (req, res) => {
  try {
    const novoCurso = await Cursosxarope.create(req.body);
    res.status(201).json(novoCurso);
  } catch (error) {
    console.error('Erro ao criar curso xarope:', error);
    res.status(500).json({ message: 'Erro ao criar curso xarope.' });
  }
});

app.get('/Cursosxarope', async (req, res) => {
  try {
    const cursos = await Cursosxarope.find();
    res.json(cursos);
  } catch (error) {
    console.error('Erro ao obter cursos xaropes:', error);
    res.status(500).json({ message: 'Erro ao obter cursos xaropes.' });
  }
});






app.listen(5241)// Iniciar o servidor


mongoose.connect('mongodb+srv://jardianagalvao:MongoDB2024@clusterjardi.ku3mez7.mongodb.net/XaropeBD')

.then(() => {
  console.log("Conectado ao MongoDB Atlas")

}).catch (() =>
  console.log("Erro ao conectar ao MongoDB Atlas")
)




























//const bodyParser = require('body-parser');








//// Middleware para tratar o corpo das requisições
//app.use(bodyParser.json());
//
//// Simulação de um banco de dados (substitua por um banco de dados real em um ambiente de produção)
//let usuarios = [];
//
//// Rota para cadastrar um novo usuário
//app.post('/usuarios', (req, res) => {
//  const newUser = req.body;
//
//  // Verifica se o usuário já existe pelo email
//  const existingUser = usuarios.find(user => user.email === newUser.email);
//  if (existingUser) {
//    return res.status(400).json({ error: 'Email já cadastrado' });
//  }
//
//  // Adiciona o novo usuário à lista
//  usuarios.push(newUser);
//  res.status(201).json(newUser);
//});
//
//// Rota para fazer login
//app.get('/usuarios', (req, res) => {
//  const { email } = req.query;
//
//  // Encontra o usuário correspondente ao email fornecido
//  const user = usuarios.find(user => user.email === email);
//  if (!user) {
//    return res.status(404).json({ error: 'Usuário não encontrado' });
//  }
//
//  res.json(user);
//});
//
//// Inicia o servidor
//app.listen(PORT, () => {
//  console.log(`Servidor rodando em http://localhost:${PORT}`);
//});
//