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
            problema: problema.toLowerCase(),
            versao: versao.toLowerCase(),
            usuario_id: user_id,
            descricao: descricao.toLowerCase(),
            prioridade: prioridade.toLowerCase(),
            status: status ? status.toLowerCase() : "novo"
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

// async function DeleteIssue(req, res) {
//     let { }
// }


module.exports = {
    CreateIssue
};