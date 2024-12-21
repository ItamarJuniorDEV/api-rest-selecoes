import request from 'supertest';
import app from './app.js';
import conexao from './infra/conexao.js';

// Após todos os testes, feche a conexão com o banco
afterAll(() => {
    conexao.end();
});

describe('API de Seleções', () => {
    let idCriado;

    it('Deve listar todas as seleções (GET /selecoes)', async () => {
        const res = await request(app).get('/selecoes');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('Deve criar uma nova seleção (POST /selecoes)', async () => {
        const novaSelecao = { selecao: 'Brasil', grupo: 'G' };
        const res = await request(app).post('/selecoes').send(novaSelecao);
        expect(res.statusCode).toBe(201);
        expect(res.body.mensagem).toBe('Seleção cadastrada com sucesso!');
        expect(res.body.data).toHaveProperty('id');
        idCriado = res.body.data.id;
    });

    it('Deve buscar uma seleção por ID (GET /selecoes/:id)', async () => {
        const res = await request(app).get(`/selecoes/${idCriado}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('selecao', 'Brasil');
        expect(res.body).toHaveProperty('grupo', 'G');
    });

    it('Deve atualizar uma seleção por ID (PUT /selecoes/:id)', async () => {
        const dadosAtualizados = { selecao: 'Argentina', grupo: 'F' };
        const res = await request(app).put(`/selecoes/${idCriado}`).send(dadosAtualizados);
        expect(res.statusCode).toBe(200);
        expect(res.body.mensagem).toBe(`Seleção com ID ${idCriado} atualizada com sucesso!`);
    });

    it('Deve excluir uma seleção por ID (DELETE /selecoes/:id)', async () => {
        const res = await request(app).delete(`/selecoes/${idCriado}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.mensagem).toBe(`Seleção com ID ${idCriado} excluída com sucesso!`);
    });

    it('Deve retornar erro ao buscar uma seleção inexistente (GET /selecoes/:id)', async () => {
        const res = await request(app).get('/selecoes/999999');
        expect(res.statusCode).toBe(404);
        expect(res.body.erro).toBe('Seleção com ID 999999 não encontrada');
    });
});
