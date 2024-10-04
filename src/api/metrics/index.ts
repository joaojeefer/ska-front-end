import { api } from "@/services";
import { MachineMetrics } from "./types";

export async function getLastMetricsByMachine(machineId: number, daysAgo: number): Promise<MachineMetrics[] | null> {
    try {
        const { data, status } = await api.get(`/metrics/machine/${machineId}?days=${daysAgo}`);

        if (status === 200) {
            return data;
        }

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}