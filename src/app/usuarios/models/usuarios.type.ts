export type Usuarios = {
    id?: number,
    name: string,
    nickname: string,
    photo: string | null,
    email: string,
    address: string,
    password: string,
    phone: string,
    admin: boolean
}