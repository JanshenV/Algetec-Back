const schemas = `

create table usuarios(
    id serial primary key,
    nickname varchar(200) not null,
    email varchar(225) not null,
    senha text not null,
    nivel varchar(55) not null
)
`;

module.exports = schemas;