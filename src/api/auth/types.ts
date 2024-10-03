export type SignInApiPayload = {
    username: string;
    password: string;
}

export type SingIn = {
    token: string;
    userId: number;
    username: string;
}