import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./UserProfile.css";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import {Button} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const UserProfile = ({user}) => {


    return (
        <div>
            <div className={"user-profile"}>
                <div className={"user-profile-first-row"}>
                    <div className={"avatar-username"}>
                        <Avatar style={{backgroundColor: '#3f51b5'}}>{user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}</Avatar>
                        <div className={"user-profile-primary-font"}>{user.firstName} {user.lastName}</div>
                    </div>
                    <Button color={"primary"}>
                        <PersonAddIcon style={{marginRight: 10}}/>
                        Follow
                    </Button>
                </div>
                <div className={"user-profile-second-row"}>
                    <div className={"user-profile-secondary-font"} style={{marginRight: 25}}>@{user.username}</div>
                    <MailOutlineIcon className={"user-profile-secondary-font"} style={{marginRight: 5}}/>
                    <div className={"user-profile-secondary-font"}>{user.email}</div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;
