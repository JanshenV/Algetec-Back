const yup = require('./yup');

const yupCreateUser = yup.object().shape({
    nickname: yup.string().min(3).max(55).required(),
    email: yup.string().email().required(),
    senha: yup.string().min(6).required(),
    nivel: yup.string().required()
});

const yupLoginUser = yup.object().shape({
    email: yup.string().email().required(),
    senha: yup.string().min(6).required()
});


module.exports = {
    yupCreateUser,
    yupLoginUser
};