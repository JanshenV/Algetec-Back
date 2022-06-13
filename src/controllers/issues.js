const knex = require('../database/connection');

//Validations
const {
    yupCreateIssue
} = require('../validations/yupIssues');


async function CreateIssue(req, res) {
    let {
        problema,
        versao,
        descricao,
        prioridade,
        status
    } = req.body;

    let { id: user_id } = req.user;

    try {
        await yupCreateIssue.validate(req.body);

        let newIssue = {
            problema,
            versao,
            usuario_id: user_id,
            descricao,
            prioridade,
            status: status ? status : "Novo"
        };

        await knex('issues')
            .insert(newIssue);

        return res.status(201).json({
            message: 'Issue criada com sucesso.'
        });
    } catch ({ message }) {
        return res.status(500).json({
            message
        });
    };
};


module.exports = {
    CreateIssue
};