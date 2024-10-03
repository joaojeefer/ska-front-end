"use client";
import GaugeChart from "react-gauge-chart";

const OEEGauge = ({ data, title }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">{title}</h2>
            <GaugeChart
                id="oee-gauge"
                nrOfLevels={20}
                percent={data.oee / 100} //entrada tem que ser em percentual
                colors={["#FF0000", "#0000ff", "#00FF00"]}
                arcWidth={0.3}
                textColor={"#000"}
            />
            <div className="flex justify-around mt-4">
                <div className="text-center">
                    <p className="text-md font-semibold">Disponibilidade</p>
                    <p className="text-lg">{data.performance}</p>
                </div>
                <div className="text-center">
                    <p className="text-md font-semibold">Produtividade</p>
                    <p className="text-lg">{data.performance}</p>
                </div>
                <div className="text-center">
                    <p className="text-md font-semibold">Qualidade</p>
                    <p className="text-lg">{data.performance}</p>
                </div>
            </div>
        </div>
    );
};

export default OEEGauge;
