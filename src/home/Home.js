import React from "react";
import "./Home.css";
import Posts from "../posts/Posts";

const Home = () => {
    return(
        <div className={"home-screen"}>
            <Posts/>
        </div>
    )
}

export default Home;
