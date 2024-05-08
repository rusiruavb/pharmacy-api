export enum UserRole {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  CASHIER = 'CASHIER',
  CUSTOMER = 'CUSTOMER',
}

export enum RolePermission {
  CREATE_USER = 'create:user',
  READ_USER = 'read:user',
  READ_USERS = 'read:users',
  UPDATE_USER = 'update:user',
  SOFT_DELETE_USER = 'softdelete:user',
  DELETE_USER = 'delete:user',
  CREATE_MEDICINE = 'create:medicine',
  READ_MEDICINE = 'read:medicine',
  READ_MEDICINES = 'read:medicines',
  UPDATE_MEDICINE = 'update:medicine',
  DELETE_MEDICINE = 'delete:medicine',
  SOFT_DELETE_MEDICINE = 'softdelete:medicine',
}
