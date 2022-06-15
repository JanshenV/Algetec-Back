const yup = require('./yup');

const yupCreateIssue = yup.object().shape({
    problema: yup.string().required(),
    versao: yup.string().required(),
    descricao: yup.string().required(),
    prioridade: yup.string().required(),
    status: yup.string(),
    atribuido: yup.number().required()
});

const yupModifyIssueStatus = yup.object().shape({
    status: yup.string().required()
});

module.exports = {
    yupCreateIssue,
    yupModifyIssueStatus
};