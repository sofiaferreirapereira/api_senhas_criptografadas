const bcrypt = require('bcrypt');

const senha_segura = "1234";
const salt = 10;
const hash_senha_segura = bcrypt.hashSync(senha_segura, salt);
console.log(`Antiga senha: ${senha_segura}`);
console.log(`Senha criptografada: ${hash_senha_segura}`);

console.log(`São iguais? ${bcrypt.compareSync('123456', hash_senha_segura)}`);