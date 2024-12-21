import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

conexao.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        process.exit(1);
    } else {
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    }
});

export default conexao;
