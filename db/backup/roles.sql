create table roles
(
    id          integer                           not null
        primary key autoincrement,
    name        varchar(100)                      not null,
    description varchar(100)                      not null,
    created_at  varchar default (datetime('now')) not null,
    updated_at  varchar default (datetime('now')) not null,
    deleted_at  varchar
);

INSERT INTO roles (id, name, description, created_at, updated_at, deleted_at) VALUES (2, 'OWNER', 'Owner of the system', '2024-05-08 09:43:18', '2024-05-08 09:43:18', null);
INSERT INTO roles (id, name, description, created_at, updated_at, deleted_at) VALUES (3, 'MANAGER', 'Manager of the system', '2024-05-08 09:44:46', '2024-05-08 09:44:46', null);
INSERT INTO roles (id, name, description, created_at, updated_at, deleted_at) VALUES (4, 'CASHIER', 'Cashier of the system', '2024-05-08 09:46:27', '2024-05-08 09:46:27', null);
INSERT INTO roles (id, name, description, created_at, updated_at, deleted_at) VALUES (5, 'CUSTOMER', 'Customer of the system', '2024-05-08 09:46:53', '2024-05-08 09:46:53', null);
