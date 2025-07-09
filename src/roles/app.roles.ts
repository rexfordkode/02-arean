import { RolesBuilder } from 'nest-access-control';

export const roles = ['user', 'superAdmin', 'admin'];

export type Role = (typeof roles)[number];

export const AppRoles: Record<Role, Role> = {
  user: 'user',
  admin: 'admin',
  superAdmin: 'superAdmin',
};

export const RBAC_ROLES = new RolesBuilder();

RBAC_ROLES.grant(AppRoles.user)
  .createOwn('profile')
  .readOwn('profile')
  .updateOwn('profile')
  .deleteOwn('profile')
  .readAny('profile')
  .createAny('profile')
  .updateAny('profile')
  .deleteAny('profile')
  .readAny('user')
  .readAny('role');

RBAC_ROLES.grant(AppRoles.admin)
  .createOwn('profile')
  .readOwn('profile')
  .updateOwn('profile')
  .deleteOwn('profile')
  .readAny('profile')
  .createAny('profile')
  .updateAny('profile')
  .deleteAny('profile')
  .readAny('user')
  .createAny('user')
  .updateAny('user')
  .deleteAny('user')
  .readAny('role')
  .createAny('role');

RBAC_ROLES.grant(AppRoles.superAdmin)
  .createOwn('profile')
  .readOwn('profile')
  .updateOwn('profile')
  .deleteOwn('profile')
  .readAny('profile')
  .createAny('profile')
  .updateAny('profile')
  .deleteAny('profile')
  .readAny('user')
  .createAny('user')
  .updateAny('user')
  .deleteAny('user');
