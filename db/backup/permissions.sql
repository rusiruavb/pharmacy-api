create table permissions
(
    id          integer                           not null
        primary key autoincrement,
    name        varchar(100)                      not null,
    description varchar(100)                      not null,
    created_at  varchar default (datetime('now')) not null,
    updated_at  varchar default (datetime('now')) not null,
    deleted_at  varchar
);

INSERT INTO permissions (id, name, description, created_at, updated_at, deleted_at) VALUES (1, 'create:user', 'Create a user', '2024-05-08 09:22:56', '2024-05-08 09:22:56', null);
INSERT INTO permissions (id, name, description, created_at, updated_at, deleted_at) VALUES (2, 'read:user', 'Read user information', '2024-05-08 09:26:37', '2024-05-08 09:26:37', null);
INSERT INTO permissions (id, name, description, created_at, updated_at, deleted_at) VALUES (3, 'read:users', 'Read all users', '2024-05-08 09:26:47', '2024-05-08 09:26:47', null);
INSERT INTO permissions (id, name, description, created_at, updated_at, deleted_at) VALUES (4, 'update:user', 'Update user information', '2024-05-08 09:26:52', '2024-05-08 09:26:52', null);
INSERT INTO permissions (id, name, description, created_at, updated_at, deleted_at) VALUES (5, 'softdelete:user', 'Softly delete the user', '2024-05-08 09:27:15', '2024-05-08 09:27:15', null);
INSERT INTO permissions (id, name, description, created_at, updated_at, deleted_at) VALUES (6, 'delete:user', 'Delete the user', '2024-05-08 09:27:32', '2024-05-08 09:27:32', null);
INSERT INTO permissions (id, name, description, created_at, updated_at, deleted_at) VALUES (7, 'create:medicine', 'Create medicine record', '2024-05-08 09:27:52', '2024-05-08 09:27:52', null);
INSERT INTO permissions (id, name, description, created_at, updated_at, deleted_at) VALUES (8, 'read:medicine', 'Read medicine record', '2024-05-08 09:28:35', '2024-05-08 09:28:35', null);
INSERT INTO permissions (id, name, description, created_at, updated_at, deleted_at) VALUES (9, 'read:medicines', 'Read all medicine records', '2024-05-08 09:28:47', '2024-05-08 09:28:47', null);
INSERT INTO permissions (id, name, description, created_at, updated_at, deleted_at) VALUES (10, 'update:medicine', 'Update medicine record', '2024-05-08 09:29:03', '2024-05-08 09:29:03', null);
INSERT INTO permissions (id, name, description, created_at, updated_at, deleted_at) VALUES (11, 'softdelete:medicine', 'Softly remove medicine record', '2024-05-08 09:29:27', '2024-05-08 09:29:27', null);
INSERT INTO permissions (id, name, description, created_at, updated_at, deleted_at) VALUES (12, 'delete:medicine', 'Delete medicine record', '2024-05-08 09:29:47', '2024-05-08 09:29:47', null);
