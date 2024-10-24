const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
/* Para usar arquivos JSON */
app.use(express.json());
const PORT = 3000;

/* Lista de Usuários */
const listaUsuarios = [];

/* A API vai trabalhar com um JSON: {"username":"", "password":""} */

app.post("/register", async (req, res) => {
    const usuarioRecebido = req.body.username;
    const senhaRecebida = req.body.password;

    /* Gerando a hash criptografada */
    const hashed_password = await bcrypt.hash(senhaRecebida, 10);

    /* Adicionando usuário e senha encriptada */
    listaUsuarios.push({username:usuarioRecebido, password:hashed_password});
    res.status(201).send('Usuário criado com sucesso!')

    /* Console.log dos usuários criados para teste */
    console.log(listaUsuarios);
});

app.post("/login", async (req, res) => {
    const usuarioRecebido = req.body.username;
    const senhaRecebida = req.body.password;
    const usuarioExiste = listaUsuarios.find((usuario) => {return usuario.username == usuarioRecebido});
    
    if(!usuarioExiste) {
        res.status(400).send('Usuário não encontrado.')
    };

    /* Verificando se a senha bate com o hash */
    const isPasswordCorrect = await bcrypt.compare(senhaRecebida, usuarioExiste.password);
    if(isPasswordCorrect) {
        res.status(200).send('Login bem sucedido!');
    } else {
        res.status(401).send('Senha incorreta!');
    }
});

/* Para ativar/rodar o servidor */
app.listen(PORT, () => {
    console.log(`Servidor criado na porta localhost: ${PORT}`);
});