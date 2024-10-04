import { api } from "@/services";
import { MachineMetrics } from "./types";

export async function getMetricsByMachine(machineId: number): Promise<MachineMetrics | null> {
    try {
        const { data, status } = await api.get(`/metrics/machine/${machineId}`);

        if (status === 200) {
            return data;
        }

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}