import {Switch, Route, HashRouter} from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

function Router() {
    return <HashRouter basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route path="/:coinId">
                <Coin></Coin>
            </Route>
            <Route path="/">
                <Coins></Coins>
            </Route>
        </Switch>
    </HashRouter>
}

export default Router;