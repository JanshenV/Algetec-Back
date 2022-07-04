const knex = require('../database/connection');
const jwt = require('jsonwebtoken');

async function TokenValidation(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({
        message: "Acesso não autorizado."
    });

    try {
        const token = authorization.replace('Bearer ', '').trim();
        const { id } = jwt.verify(token, process.env.SECRET_JWT);

        const user = await knex('usuarios')
            .where({ id })
            .first();

        if (!user) return res.status(404).json({
            message: 'Usuário com esse token não foi encontrado.'
        });

        const { senha: _, ...userData } = user;
        req.user = userData;
        
        next();
    } catch ({ message }) {
        return res.status(500).json({
            message
        });
    };
};

module.exports = TokenValidation;