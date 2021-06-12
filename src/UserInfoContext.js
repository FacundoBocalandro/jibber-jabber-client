import React, {useEffect, useState} from "react";
import {get} from "./utils/http";

const Context = React.createContext(undefined);

const UserInfoContext = ({children}) => {
    const [userInfo, setUserInfo] = useState(undefined);

    useEffect(() => {
        get('auth/user-info')
            .then(res => {
                setUserInfo(res);
            })
    }, [])

    return(
        <Context.Provider value={{userInfo}}>{children}</Context.Provider>
    )
}

export const useUserInfo = () => {
    return React.useContext(Context);
}

export default UserInfoContext;
