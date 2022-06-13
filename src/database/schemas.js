const schemasUser = `

create table usuarios(
    id serial primary key,
    nickname varchar(200) not null,
    email varchar(225) not null,
    senha text not null,
    nivel varchar(55) not null
) `;


const schemasIssues = `
create table issues(
    id serial primary key,
    problema text not null,
    versao text not null,
    usuario_id int not null  references usuarios(id),
    descricao text not null,
    prioridade varchar(55) not null,
    status text default 'Novo',
    data timestamptz default now()
)`;

module.exports = { schemasUser, schemasIssues };