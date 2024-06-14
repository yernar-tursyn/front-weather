export const CovidStats = ({ covidData }) => {
    return (
        <div className="p-4 bg-[#2C2D35] text-white rounded-lg mb-4">
            <h2 className="text-sm font-bold mb-2">Coronavirus Latest</h2>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="text-[#929396] text-sm">Tamil Nadu, Chennai</p>
                    <p className="text-white text-sm">Confirmed Cases</p>
                </div>
                <div className="flex">
                    <div className="mr-4">
                        <p className="text-gray-400 mb-1">Total</p>
                        <p className="text-white bg-[#32333E] px-5 p-2">{covidData.total}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 mb-1">Today</p>
                        <p className="text-white bg-[#FF0000] px-5 p-2 rounded-2 font-bold">{covidData.new}</p>
                    </div>
                </div>
            </div>
            <p className="text-gray-400 cursor-pointer flex">More detail</p>
        </div>
    );
};

