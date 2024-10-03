import { api } from "@/services";
import { Machine } from "./types";

export async function getMachines(): Promise<Machine[] | null> {
    try {
        const { data, status } = await api.get('/machines');
        
        if (status === 200) {
            return data;
        }
        
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}