CREATE TABLE autores (
  id serial primary key,
  nome text not null,
  idade smallint
);

CREATE TABLE livros (
  id serial primary key,
  autor_id integer not null,
  nome text not null,
  editora varchar(100),
  genero varchar(50) not null,
  data_publicacao date,
  foreign key (autor_id) references autores (id)
);

CREATE TABLE usuarios(
  id serial primary key,
  nome text not null,
  idade smallint,
  email varchar(50) unique,
  telefone varchar(11),
  cpf varchar(11) not null unique
);

CREATE TABLE emprestimos (
  id serial primary key,
  usuario_id integer not null references usuarios(id),
  livro_id integer not null references livros(id),
  status varchar(10) default 'pendente'
); 







