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
    descricao text not null,
    prioridade varchar(55) not null,
    status text default 'Novo',
    autor int not null references usuarios(id),
    data timestamptz default now()
)`;

const schemasForeignKeys = `
create table relacoes(
    id serial primary key,
    issue_id int not null references issues(id),
    atribuido int not null references usuarios(id)
)`

module.exports = {
    schemasUser,
    schemasIssues,
    schemasForeignKeys
};