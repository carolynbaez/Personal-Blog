export enum UserRoleEnum {
    admin,
    user
}

export const UserRole = {
    [UserRoleEnum.admin]: "Administrador",
    [UserRoleEnum.user]: "Usuario"
}

export enum UserTypeEnum {
    basic,
    premium
}

export const UserType = {
    [UserTypeEnum.basic]: "Básico",
    [UserTypeEnum.premium]: "Premium"
}