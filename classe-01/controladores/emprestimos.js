const conexao = require('../conexao');

async function listarEmprestimos(req, res){
    try {
        const { rows: emprestimos } = await conexao.query('select * from emprestimos');

        return res.status(200).json(emprestimos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function obterEmprestimo(req, res){
    const { id } = req.params;
    try {
        const emprestimo = await conexao.query('select * from emprestimos where id = $1', [id]);

        if (emprestimo.rowCount === 0) {
            return res.status(404).json('Empréstimo de livro não encontrado');
        }

        return res.status(200).json(emprestimo.rows[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function cadastrarEmprestimo(req, res){

    
}

async function atualizarEmprestimo(req, res){
    
}

async function excluirEmprestimo(req, res){
    

}

module.exports = {
    listarEmprestimos,
    obterEmprestimo,
    cadastrarEmprestimo,
    atualizarEmprestimo,
    excluirEmprestimo
}