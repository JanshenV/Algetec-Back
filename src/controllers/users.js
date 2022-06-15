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

        senha = await bcrypt.hash(String(senha), 10);

        const newUserData = {
            nickname: nickname.toLowerCase(),
            email,
            senha,
            nivel: nivel.toLowerCase()
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

async function GetAllUsers(req, res) {
    try {
        const allUsers = await knex('usuarios')
            .select('id', 'nickname', 'email', 'nivel');

        return res.status(200).json({
            allUsers
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

        email = email.toLowerCase();
        const user = await knex('usuarios')
            .where({ email })
            .first();

        if (!user) return res.status(404).json({
            message: `Usuário com email ${email} não encontrado.`
        });
        const passwordCompare = await bcrypt.compare(String(senha), user.senha);

        if (!passwordCompare) return res.status(401).json({
            message: "Email e senha não conferem."
        });

        const token = jwt.sign(
            { id: user.id },
            process.env.SECRET_JWT,
            { expiresIn: '8h' }
        );

        return res.status(200).json({
            token
        });
    } catch ({ message }) {
        return res.status(500).json({ message });
    };
};

async function UserProfile(req, res) {
    const user = req.user;

    return res.status(200).json({
        user
    });
};

module.exports = {
    UserSignUp,
    UserLogin,
    UserProfile,
    GetAllUsers
};