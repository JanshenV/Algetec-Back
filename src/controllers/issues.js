const knex = require('../database/connection');

//Validations
const {
    yupCreateIssue,
    yupModifyIssueStatus
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

        const dateNow = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Bahia'
        });

        let newIssue = {
            problema: problema.toLowerCase(),
            versao: versao.toLowerCase(),
            usuario_id: user_id,
            descricao: descricao.toLowerCase(),
            prioridade: prioridade.toLowerCase(),
            status: status ? status.toLowerCase() : "novo",
            data: dateNow
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

async function DeleteIssue(req, res) {
    let { id: issue_id } = req.params;
    const user = req.user;

    if (!issue_id || !(Number(issue_id) > 0)) return res.status(400).json({
        message: 'O id do issue deve existir nos paramêtros da URL e deve ser um número válido.'
    });

    try {
        const issue = await knex('issues')
            .where({ id: issue_id })
            .first();

        if (!issue) return res.status(404).json({
            message: 'Issue não foi encontrada.'
        });

        if (user.nivel !== "scrum master") return res.status(401).json({
            message: 'Apenas Scrum Masters podem apagar itens.'
        });

        await knex('issues')
            .del()
            .where({ id: issue_id });

        return res.status(200).json();
    } catch ({ message }) {
        return res.status(500).json({
            message
        });
    };
};

async function ModifyIssueStatus(req, res) {
    let { status } = req.body;
    let { id: issue_id } = req.params;
    let user = req.user;

    if (!issue_id || !(Number(issue_id) > 0)) return res.status(400).json({
        message: 'O id do issue deve existir nos paramêtros da URL e deve ser um número válido.'
    });

    try {
        await yupModifyIssueStatus.validate(req.body);

        let issue = await knex('issues')
            .where({ id: issue_id })
            .first();

        if (!issue) return res.status(404).json({
            message: 'Issue não encontrada.'
        });

        const availableStatus = [
            'novo',
            'não será removido',
            'duplicado',
            'não é erro',
            'resolvido',
            'aprovado',
            'reprovado'
        ];

        if (status === 'aprovado' || status === 'reprovado') {
            if (user.id !== issue.usuario_id) return res.status(401).json({
                message: `Somente o criador deste item pode modificar para o status ${status}`
            });
        };

        if (!availableStatus.includes(status)) return res.status(404).json({
            message: `Não é possível modificar o status para "${status}"`
        });

        const dateNow = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Bahia'
        });

        issue = await knex('issues')
            .where({
                id: issue_id,
            })
            .update({
                status,
                data: dateNow
            })
            .returning('*');

        return res.status(200).json({ issue });
    } catch ({ message }) {
        return res.status(500).json({
            message
        });
    };
};

module.exports = {
    CreateIssue,
    DeleteIssue,
    ModifyIssueStatus
};