"use client";
import GaugeChart from "react-gauge-chart";

const OEEGauge = ({ data }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">OEE</h2>
            <GaugeChart
                id="oee-gauge"
                nrOfLevels={20}
                percent={data.percent}//{0.49} // Valor de OEE (49%)
                colors={["#FF5F6D", "#FFC371", "#00bfff"]}
                arcWidth={0.3}
                textColor={"#000"}
            />
            <div className="flex justify-around mt-4">
                <div className="text-center">
                    <p className="text-md font-semibold">Disponibilidade</p>
                    <p className="text-lg">{data.disponibilidade}</p>
                </div>
                <div className="text-center">
                    <p className="text-md font-semibold">Produtividade</p>
                    <p className="text-lg">{data.produtividade}</p>
                </div>
                <div className="text-center">
                    <p className="text-md font-semibold">Qualidade</p>
                    <p className="text-lg">{data.qualidade}</p>
                </div>
            </div>
        </div>
    );
};

export default OEEGauge;
