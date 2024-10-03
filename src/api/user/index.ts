import { api } from "@/services";
import { GetUserInfo } from "./types";

export async function getUserInfoById(userId: number): Promise<GetUserInfo | null> {
    try {
        const { data, status } = await api.get(`/users/${userId}`);
        
        if (status === 200) {
            return { userId: data.id, name: data.name, username: data.username };
        }

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}