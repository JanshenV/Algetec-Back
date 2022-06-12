const yup = require('./yup');

const yupCreateUser = yup.object().shape({
    nickname: yup.string().min(3).max(55).required(),
    senha: yup.string().min(6).required(),
    nivel: yup.string().required()
});


module.exports = {
    yupCreateUser
}