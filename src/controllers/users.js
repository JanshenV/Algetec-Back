const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Validations
const {
    yupCreateUser,
    yupLoginUser
} = require('../validations/yupUser');

async function UserSignUp(req, res) {
    let {
        nickname, email, senha, nivel
    } = req.body;

    const reqBodyLength = Object.keys(req.body).length;

    if (reqBodyLength === 0) return res.status(400).json({
        message: 'Todos os campos são obrigatórios.'
    });

    try {
        await yupCreateUser.validate(req.body);

        email = email.toLowerCase();
        const existingEmail = await knex('usuarios')
            .where({ email })
            .first();

        if (existingEmail) return res.status(409).json({
            message: "Email já utilizado por outro usuário."
        });

        nickname = nickname.toLowerCase();
        senha = await bcrypt.hash(String(senha), 10);

        const newUserData = {
            nickname,
            email,
            senha,
            nivel
        };

        await knex('usuarios')
            .insert(newUserData);

        return res.status(201).json({
            message: 'Usuário criado com sucesso!'
        });
    } catch ({ message }) {
        return res.status(500).json({
            message
        });
    };
};

async function UserLogin(req, res) {
    let {
        email,
        senha
    } = req.body;

    const reqBodyLength = Object.keys(req.body).length;

    if (reqBodyLength === 0) return res.status(400).json({
        message: 'Todos os campos são obrigatórios.'
    });

    try {
        await yupLoginUser.validate(req.body);
    } catch ({ message }) {
        return res.status(500).json({ message });
    };
};


module.exports = {
    UserSignUp,
    UserLogin
};