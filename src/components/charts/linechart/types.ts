export type LineChartDataset = {
    title: string;
    labels: string[];
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
};

export type LineChartProps = {
    dataset: LineChartDataset;
}