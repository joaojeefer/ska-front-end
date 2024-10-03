import { api } from "@/services";
import { SignInApiPayload, SingIn } from "./types";

export async function signIn(payload: SignInApiPayload): Promise<SingIn | null> {
    try {
        const { data, status } = await api.post('/auth/login', payload);

        if (status === 200) {
            return { token: data.accessToken, userId: data.userId, username: data.username };
        }

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}