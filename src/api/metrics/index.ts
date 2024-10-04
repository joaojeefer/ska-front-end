import { api } from "@/services";
import { MachineMetric } from "./types";

export async function getMetricFromMachines(machineId: number): Promise<MachineMetric | null> {
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