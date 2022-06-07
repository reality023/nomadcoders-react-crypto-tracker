import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface PriceProps {
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

function Price({coinId}: PriceProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => (
        fetchCoinHistory(coinId)
    ), {
        refetchInterval: 10000,
    });
    return (
        <div>
        {
            isLoading ? "Loading price..." :
            data?.map(price => {
                return (
                    <div style={{marginBottom: "10px"}}>
                        <div>DATE: {price.time_open}</div>
                        <div>HIGH : {price.high}</div>
                        <div>LOW: {price.low}</div>
                    </div>
                )
            })
        }
        </div>
    );
}

export default Price;