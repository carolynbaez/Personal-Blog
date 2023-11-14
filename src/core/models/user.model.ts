export class UserModel{
    name: string = ""
    email: string = ""
    country: string = ""
    age: number | null = null
    genre: string = "undefined"
    password: string = ""
    createdOn: Date | null = null
    type: number = 0
    rol: number = 1
}

export class LoginModel{
    email: string = ""
    password: string = ""
}