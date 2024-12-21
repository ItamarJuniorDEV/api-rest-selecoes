import express from 'express';
import conexao from '../infra/conexao.js';

// Inicialização do app
const app = express();

// Configurações globais
app.use(express.json());

// Funções auxiliares para respostas consistentes
const handleError = (res, status, message, details = null) => {
    res.status(status).json({ erro: message, detalhes: details });
};

const handleSuccess = (res, status, message = null, data = null) => {
    const response = message ? { mensagem: message } : {};
    if (data) response.data = data;
    res.status(status).json(response);
};

/**
 * Rota para listar todas as seleções.
 */
app.get('/selecoes', (req, res) => {
    const sql = "SELECT * FROM selecoes;";
    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return handleError(res, 500, 'Erro ao listar seleções', erro);
        }
        handleSuccess(res, 200, null, resultado);
    });
});

/**
 * Rota para buscar seleção por ID.
 */
app.get('/selecoes/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM selecoes WHERE id = ?;";
    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return handleError(res, 500, 'Erro ao buscar seleção', erro);
        }
        if (resultado.length === 0) {
            return handleError(res, 404, `Seleção com ID ${id} não encontrada`);
        }
        handleSuccess(res, 200, null, resultado[0]);
    });
});

/**
 * Rota para adicionar uma nova seleção.
 */
app.post('/selecoes', (req, res) => {
    const { selecao, grupo } = req.body;
    if (!selecao || !grupo) {
        return handleError(res, 400, 'Dados incompletos para criar a seleção');
    }
    const sql = "INSERT INTO selecoes (selecao, grupo) VALUES (?, ?);";
    conexao.query(sql, [selecao, grupo], (erro, resultado) => {
        if (erro) {
            return handleError(res, 400, 'Erro ao cadastrar seleção', erro);
        }
        handleSuccess(res, 201, 'Seleção cadastrada com sucesso!', { id: resultado.insertId });
    });
});

/**
 * Rota para excluir uma seleção por ID.
 */
app.delete('/selecoes/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM selecoes WHERE id = ?;";
    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return handleError(res, 500, 'Erro ao excluir seleção', erro);
        }
        if (resultado.affectedRows === 0) {
            return handleError(res, 404, `Seleção com ID ${id} não encontrada`);
        }
        handleSuccess(res, 200, `Seleção com ID ${id} excluída com sucesso!`);
    });
});

/**
 * Rota para atualizar uma seleção por ID.
 */
app.put('/selecoes/:id', (req, res) => {
    const { id } = req.params;
    const { selecao, grupo } = req.body;
    if (!selecao || !grupo) {
        return handleError(res, 400, 'Dados incompletos para atualizar a seleção');
    }
    const sql = "UPDATE selecoes SET selecao = ?, grupo = ? WHERE id = ?;";
    conexao.query(sql, [selecao, grupo, id], (erro, resultado) => {
        if (erro) {
            return handleError(res, 500, 'Erro ao atualizar seleção', erro);
        }
        if (resultado.affectedRows === 0) {
            return handleError(res, 404, `Seleção com ID ${id} não encontrada`);
        }
        handleSuccess(res, 200, `Seleção com ID ${id} atualizada com sucesso!`);
    });
});

export default app;
