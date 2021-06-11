import React from "react";
import "./AppFrame.css";
import Navbar from "../navbar/Navbar";

const AppFrame = ({children}) => {
    return(
        <div className={"app-frame"}>
            <Navbar/>
            <div className={"content"}>
                {children}
            </div>
        </div>
    )
}

export default AppFrame;
