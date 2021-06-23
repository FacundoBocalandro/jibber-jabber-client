import React, {useState} from "react";
import "./UserProfile.css";
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    FilledInput, IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@material-ui/core";
import {useUserInfo} from "../UserInfoContext";
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import "./EditUserModal.css";
import {put} from "../utils/http";
import {Visibility, VisibilityOff} from "@material-ui/icons";

const EditUserModal = ({open, onClose, setUpdatedUser}) => {
    const {userInfo} = useUserInfo();

    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: null
    });

    const onSave = () => {
        put(`auth/update/${userInfo.id}`, user).then(() => {})
        const updatedUser = user;
        delete updatedUser.password;
        setUpdatedUser({...userInfo, ...updatedUser});
        onClose();
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <div className={"user-profile"}>
                <Dialog
                    open={open}
                    onClose={onClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    fullWidth={true}
                    maxWidth={'sm'}
                >
                    <DialogTitle style={{ cursor: 'move', textAlign: 'center' }} id="draggable-dialog-title">
                        <Typography variant={"h4"}>Edit Profile</Typography>
                    </DialogTitle>
                    <div className={"modal-body-container"}>
                        <Typography color={"primary"} variant={"h5"} align={"left"}>First Name</Typography>
                        <TextField
                            id="filled-multiline-flexible"
                            variant="filled"
                            fullWidth
                            style={{marginBottom: '30px'}}
                            defaultValue={user?.firstName}
                            placeholder={"First Name"}
                            onChange={(e) => setUser({...user, firstName: e.target.value})}
                        />
                        <Typography color={"primary"} variant={"h5"} align={"left"}>Last Name</Typography>
                        <TextField
                            id="filled-multiline-flexible"
                            variant="filled"
                            fullWidth
                            style={{marginBottom: '30px'}}
                            value={user?.lastName}
                            placeholder={"Last Name"}
                            onChange={(e) => setUser({...user, lastName: e.target.value})}
                        />
                        <Typography color={"primary"} variant={"h5"} align={"left"}>Email</Typography>
                        <TextField
                            id="filled-multiline-flexible"
                            variant="filled"
                            fullWidth
                            style={{marginBottom: '30px'}}
                            value={user?.email}
                            placeholder={"Email"}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                        />
                        <Typography color={"primary"} variant={"h5"} align={"left"}>New Password (optional)</Typography>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={user?.password}
                            placeholder={"New Password"}
                            style={{marginBottom: '30px'}}
                            fullWidth
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </div>
                    <DialogActions>
                        <Button autoFocus onClick={onClose} color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={onSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
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

export default EditUserModal;
