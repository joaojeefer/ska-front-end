"use client";
import GaugeChart from "react-gauge-chart";

const OEEGauge = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">OEE</h2>
            <GaugeChart
                id="oee-gauge"
                nrOfLevels={20}
                percent={0.49} // Valor de OEE (49%)
                colors={["#FF5F6D", "#FFC371", "#00bfff"]}
                arcWidth={0.3}
                textColor={"#000"}
            />
            <div className="flex justify-around mt-4">
                <div className="text-center">
                    <p className="text-md font-semibold">Disponibilidade</p>
                    <p className="text-lg">96%</p>
                </div>
                <div className="text-center">
                    <p className="text-md font-semibold">Produtividade</p>
                    <p className="text-lg">56%</p>
                </div>
                <div className="text-center">
                    <p className="text-md font-semibold">Qualidade</p>
                    <p className="text-lg">92%</p>
                </div>
            </div>
        </div>
    );
};

export default OEEGauge;
