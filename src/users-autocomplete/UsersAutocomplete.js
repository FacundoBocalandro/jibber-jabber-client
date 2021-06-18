import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {get} from "../utils/http";
import "./UsersAutocomplete.css"
import {useHistory} from "react-router";
import {useUserInfo} from "../UserInfoContext";

const UsersAutocomplete = () => {
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const {userInfo} = useUserInfo();

    useEffect(() => {
        if (userInfo) {
            get('auth/get-all')
                .then(res => {
                    setUsers(res.filter(user => user.id !== userInfo?.id));
                })
        }
    }, [userInfo]);

    const getUserOption = (option) => {
        return (
            <div className={"job-option-card"} onClick={() => history.push(`/main/home?userId=${option.id}`)}>
                <span className={"job-option-primary-text"}>@{option.username}</span>
                <span className={"job-option-secondary-text"}>{`${option.firstName} ${option.lastName} · ${option.email}`}</span>
            </div>
        )
    };

    const onValueChange = (reason) => {
        if (reason === "clear") history.push("/main/home")
    }

    return (
        <Autocomplete
            id="combo-box-demo"
            options={users}
            getOptionLabel={option => `@${option.username}`}
            renderOption={getUserOption}
            style={{ width: 300 }}
            onChange={(event, value, reason) => onValueChange(reason)}
            renderInput={(params) =>
                <TextField {...params} placeholder={"Search users"} variant="outlined"/>
            }
        />
    );
}

export default UsersAutocomplete;
