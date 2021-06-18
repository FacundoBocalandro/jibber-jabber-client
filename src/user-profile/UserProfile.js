import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import "./UserProfile.css";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import {Button, Dialog, DialogTitle, IconButton, Typography} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClearIcon from '@material-ui/icons/Clear';
import {put} from "../utils/http";
import {useUserInfo} from "../UserInfoContext";
import SendIcon from '@material-ui/icons/Send';
import {ChatBox} from "../chat/ChatBox";
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';

const UserProfile = ({user}) => {
    const {userInfo} = useUserInfo();
    const [following, setFollowing] = useState(userInfo.following);
    const [openChat, setOpenChat] = useState(false);

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

    const handleClose = () => {
        setOpenChat(false);
    };


    return (
        <div>
            <div className={"user-profile"}>
                <div className={"user-profile-first-row"}>
                    <div className={"avatar-username"}>
                        <Avatar style={{backgroundColor: '#3f51b5'}}>{user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}</Avatar>
                        <div className={"user-profile-primary-font"}>{user.firstName} {user.lastName}</div>
                    </div>
                    {user.id !== userInfo.id &&
                        <div>
                            {following.includes(user.id) ?
                                <Button color={"secondary"} onClick={onUnFollow}>
                                    <div className={"unfollow"}><ClearIcon style={{marginRight: 5}}/>Unfollow</div>
                                </Button> :
                                <Button color={"primary"} onClick={onFollow}>
                                    <div className={"follow"}><PersonAddIcon style={{marginRight: 5}}/>Follow</div>
                                </Button>
                            }
                        </div>
                    }
                </div>
                <div className={"second-row-container"}>
                    <div className={"user-profile-second-row"}>
                        <div className={"user-profile-secondary-font"} style={{marginRight: 25}}>@{user.username}</div>
                        <MailOutlineIcon className={"user-profile-secondary-font"} style={{marginRight: 5}}/>
                        <div className={"user-profile-secondary-font"}>{user.email}</div>
                    </div>
                    <IconButton color={"primary"} onClick={() => setOpenChat(true)}>
                        <SendIcon style={{marginRight: 5}}/>
                        CHAT
                    </IconButton>
                </div>
                <Dialog
                    open={openChat}
                    onClose={handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    fullWidth={true}
                    maxWidth={'sm'}
                >
                    <DialogTitle style={{ cursor: 'move', textAlign: 'center' }} id="draggable-dialog-title">
                        <Typography variant={"h4"}>{user.firstName} {user.lastName}</Typography>
                    </DialogTitle>
                    <ChatBox user={user}/>
                </Dialog>
            </div>
        </div>
    )
}

const PaperComponent = (props) => {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export default UserProfile;
