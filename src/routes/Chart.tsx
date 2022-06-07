import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import ReactApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ISeries {
    x: Date;
    y: number[];
}

function Chart({ coinId }: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => (
        fetchCoinHistory(coinId)
    ), {
        refetchInterval: 10000,
    });

    return <div>
        {
        isLoading ? 
        "Loading chart..." : 
        <ReactApexChart 
            type="candlestick"
            series={[
                {
                    name: "Price",
                    data: data?.map(
                        (price) => {
                            return {
                                x: new Date(price.time_open),
                                y: [price.open, price.high, price.low, price.close]
                            }
                        }
                    ) as ISeries[],
                },
            ]}
            options={{
                theme: {
                    mode: isDark ? "dark" : "light"
                },
                chart: {
                    height: 300,
                    width: 500,
                    toolbar: {
                        show: false,
                    },
                    background: "transparent",
                },
                grid: {
                    show: false,
                },
                stroke: {
                    curve: "smooth",
                    width: 4,
                },
                yaxis: {
                    show: false,
                },
                xaxis: {
                    type: "datetime",
                    labels: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                    },
                    categories: data?.map((price) => price.time_close),
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        gradientToColors: ["#0be881"],
                        stops: [0, 100]
                    }
                },
                colors: ["#0fbcf9"],
                tooltip: {
                    y: {
                        formatter: (value) => `${value.toFixed(3)}`
                    }
                }
            }}
        />
        }
    </div>;
}

export default Chart;