create table roles_permissions_permissions
(
    rolesId       integer not null
        constraint FK_dc2b9d46195bb3ed28abbf7c9e3
            references roles
            on update cascade on delete cascade,
    permissionsId integer not null
        constraint FK_fd4d5d4c7f7ff16c57549b72c6f
            references permissions
            on update cascade on delete cascade,
    primary key (rolesId, permissionsId)
);

create index IDX_dc2b9d46195bb3ed28abbf7c9e
    on roles_permissions_permissions (rolesId);

create index IDX_fd4d5d4c7f7ff16c57549b72c6
    on roles_permissions_permissions (permissionsId);

INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (2, 1);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (2, 2);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (2, 3);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (2, 4);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (2, 5);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (2, 6);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (2, 7);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (2, 8);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (2, 9);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (2, 10);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (2, 11);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (2, 12);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (3, 4);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (3, 5);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (3, 10);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (3, 11);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (3, 8);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (3, 9);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (4, 4);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (4, 8);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (4, 9);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (4, 10);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (5, 8);
INSERT INTO roles_permissions_permissions (rolesId, permissionsId) VALUES (5, 9);
