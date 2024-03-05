const conexao = require('../conexao');

async function listarUsuarios(req, res){
    try {
        const { rows: usuarios } = await conexao.query('select * from usuarios');

        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function obterUsuario(req, res){
    const { id } = req.params;
    try {
        const usuario = await conexao.query('select * from usuarios where id = $1', [id]);

        if (usuario.rowCount === 0) {
            return res.status(404).json('Usuário não encontrado');
        }

        return res.status(200).json(usuario.rows[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function cadastrarUsuario(req, res){
    const { nome, idade, email, telefone, cpf } = req.body;

    if (!nome) {
        return res.status(400).json("O campo nome é obrigatório.");
    }
    if (!email) {
        return res.status(400).json("O campo email é obrigatório.");
    }
    if (!cpf) {
        return res.status(400).json("O campo cpf é obrigatório.");
    }
    

    try {
        const query = `insert into usuarios (nome, idade, email, telefone, cpf) 
        values ($1, $2, $3, $4, $5)`;
        const usuario = await conexao.query(query, [nome, idade, email, telefone, cpf]);

        if (usuario.rowCount === 0) {
            return res.status(400).json('Não foi possivel cadastrar o usuario');
        }

        return res.status(200).json('Usuário cadastrado com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message);
    }
    
}

async function atualizarUsuario(req, res){
    const { id } = req.params;
    const { nome, idade, email, telefone, cpf } = req.body;

    try {
        const usuario = await conexao.query('select * from usuarios where id = $1', [id]);

        if (usuario.rowCount === 0) {
            return res.status(404).json('Usuario não encontrado');
        }

        if (!nome) {
            return res.status(400).json("O campo nome é obrigatório.");
        }
        if (!email) {
            return res.status(400).json("O campo email é obrigatório.");
        }
        if (!cpf) {
            return res.status(400).json("O campo cpf é obrigatório.");
        }

        const query = `update usuarios set 
        nome = $1, 
        idade = $2, 
        email = $3, 
        telefone = $4, 
        cpf = $5 
        where id = $6`;
        const usuarioAtualizado = await conexao.query(query, [nome, idade, email, telefone, cpf, id]);

        if (usuarioAtualizado.rowCount === 0) {
            return res.status(404).json('Não foi possível atualizar o usuario');
        }

        return res.status(200).json('O usuario foi atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function excluirUsuario(req, res){
    const { id } = req.params;

    try {
        const usuario = await conexao.query('select * from usuarios where id = $1', [id]);

        if (usuario.rowCount === 0) {
            return res.status(404).json('Usuário não encontrado');
        }

        const query = 'delete from usuarios where id = $1';
        const usuarioExcluido = await conexao.query(query, [id]);

        if (usuarioExcluido.rowCount === 0) {
            return res.status(404).json('Não foi possível excluir o usuário');
        }

        return res.status(200).json('O usuário foi excluido com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = {
    listarUsuarios,
    obterUsuario,
    cadastrarUsuario,
    atualizarUsuario,
    excluirUsuario
}