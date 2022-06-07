import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

interface ICoinsProps {
}

function Coins() {
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom(prev => !prev);
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    return (
        <Container>
            <Header>
                <Title>코인</Title>
				<button onClick={toggleDarkAtom}>Toggle Mode</button>
            </Header>
            {isLoading ? <Loader>Loading...</Loader> :
            <CoinsList>
                {data?.slice(0, 100).map(coin => (
                    <Coin key={coin.id}>
                        <Link to={{
                                pathname: `/${coin.id}`,
                                state: { name : coin.name }
                            }}>
                            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                ))}
            </CoinsList>}
        </Container>
    );
}

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    button {
        width: 100px;
        height: 50px;
        border: none;
        background-color: #38648d;
        color: #FFFFFF;
        position: absolute;
        right: 0;
        border-radius: 10px;
        cursor: pointer;

        &:hover {
            background-color: #EEEEEE;
            color: #000000;
        }
    }
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: #444444;
    border-radius: 15px;
    margin-bottom: 10px;

    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color .5s ease-in;
    }

    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

export default Coins;