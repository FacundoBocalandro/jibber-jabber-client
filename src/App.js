import './main.css';
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import Register from "./session/Register";
import Login from "./session/Login";
import Home from "./home/Home";
import AppFrame from "./common/app-frame/AppFrame";

function App() {

    return (
        <BrowserRouter>
            <div className={"app-container"}>
                <Switch style={{width: '100%', height: '100%'}}>
                    <Route exact path={"/"} component={Login}/>
                    <Route path={"/register"} component={Register}/>
                    <Route path='/main' component={({match: {url}}) => ([
                        <AppFrame key={'app-frame'}>
                            <Switch style={{width: '100%', height: '100%'}}>
                                <Route path={`${url}/home`} component={Home}/>
                            </Switch>
                        </AppFrame>
                    ])}/>
                    <Redirect to={"/"}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;
