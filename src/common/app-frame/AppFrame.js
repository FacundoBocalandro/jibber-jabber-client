import React from "react";
import "./AppFrame.css";
import Navbar from "../navbar/Navbar";
import {useUserInfo} from "../../UserInfoContext";

const AppFrame = ({children}) => {
    const {userInfo} = useUserInfo();

    return(
        <div className={"app-frame"}>
            <Navbar/>
            <div className={"content"}>
                {userInfo && children}
            </div>
        </div>
    )
}

export default AppFrame;
