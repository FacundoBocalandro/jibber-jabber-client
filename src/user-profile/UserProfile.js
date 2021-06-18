import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import "./UserProfile.css";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import {Button} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClearIcon from '@material-ui/icons/Clear';
import {put} from "../utils/http";
import {useUserInfo} from "../UserInfoContext";

const UserProfile = ({user}) => {
    const {userInfo} = useUserInfo();
    const [following, setFollowing] = useState(userInfo.following);

    const onFollow = () => {
        put(`auth/follow/${user.id}`)
            .then(() => {
                setFollowing([...following, user.id]);
            })
    }

    const onUnFollow = () => {
        put(`auth/unfollow/${user.id}`)
            .then(() => {
                setFollowing(following.filter(user => user.id !== user.id));
            })
    }

    return (
        <div>
            <div className={"user-profile"}>
                <div className={"user-profile-first-row"}>
                    <div className={"avatar-username"}>
                        <Avatar style={{backgroundColor: '#3f51b5'}}>{user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}</Avatar>
                        <div className={"user-profile-primary-font"}>{user.firstName} {user.lastName}</div>
                    </div>
                    {following.includes(user.id) ?
                        <Button color={"secondary"} onClick={onUnFollow}>
                            <div className={"unfollow"}><ClearIcon style={{marginRight: 5}}/>Unfollow</div>
                        </Button> :
                        <Button color={"primary"} onClick={onFollow}>
                            <div className={"follow"}><PersonAddIcon style={{marginRight: 5}}/>Follow</div>
                        </Button>
                    }
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
