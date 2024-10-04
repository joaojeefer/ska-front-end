import { Machine } from "../machine/types";

export type MachineMetrics = {
    id: number;
    oee: number;
    quality: number;
    performance: number;
    availability: number;
    scheduledTime: number;
    productionTime: number;
    productionTheoricTIme: number;
    realProductionTime: number;
    downtime: number;
    partsProduced: number;
    partsDiscarded: number;
    date: string;
    machineId: number;
    machine: Machine;
}
