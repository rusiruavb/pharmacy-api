create table users
(
    id          integer                           not null
        primary key autoincrement,
    firstName   varchar(100)                      not null,
    lastName    varchar(100)                      not null,
    phoneNumber varchar(10)                       not null,
    userName    varchar(100)                      not null,
    password    varchar(80)                       not null,
    created_at  varchar default (datetime('now')) not null,
    updated_at  varchar default (datetime('now')) not null,
    deleted_at  varchar,
    roleId      integer
        constraint FK_368e146b785b574f42ae9e53d5e
            references roles
);

INSERT INTO users (id, firstName, lastName, phoneNumber, userName, password, created_at, updated_at, deleted_at, roleId) VALUES (1, 'Rusiru', 'Bandara Updated', '+94776621324', 'rusiruavb', '$2b$10$9NtVEWbGsY7tlxYMcQLsku1v3J9FKo6p/JuQQfqSvvC5QqpW6qjju', '2024-05-08 10:03:10', '2024-05-08 10:44:45', null, 2);
