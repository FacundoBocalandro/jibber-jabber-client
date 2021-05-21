import './main.css';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Posts from "./posts/Posts";

function App() {

    return (
        <BrowserRouter>
            <div className={"app-container"}>
                <Switch style={{width: '100%', height: '100%'}}>
                    <Route path={"/"} component={Posts}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;
