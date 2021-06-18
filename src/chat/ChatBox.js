import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Message";

const useStyles = makeStyles((theme) =>
    createStyles({
        paper: {
            width: "100%",
            height: "100%",
            maxWidth: "700px",
            maxHeight: "700px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        paper2: {
            width: "80vw",
            maxWidth: "500px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        container: {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        messagesBody: {
            width: "calc( 100% - 20px )",
            margin: 10,
            overflowY: "scroll",
            height: "calc( 100% - 80px )",
            padding: 10
        }
    })
);

export default function ChatBox() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Paper className={classes.paper} zDepth={2}>
                <Paper id="style-1" className={classes.messagesBody}>
                    <MessageLeft
                        message="Juanpa, estas bien?"
                        timestamp={new Date().toDateString()}
                        photoURL=""
                        displayName="Yao Cabrera"
                        avatarDisp={true}
                    />
                    <MessageRight
                        message="Con mucho dolor."
                        timestamp={new Date().toDateString()}
                        photoURL=""
                        displayName="Juanpa"
                        avatarDisp={true}
                    />
                    <MessageLeft
                        message="GANGUESTER DE MIERDA"
                        timestamp={new Date().toDateString()}
                        photoURL=""
                        displayName="Yao Cabrera"
                        avatarDisp={true}
                    />
                </Paper>
                <TextInput />
            </Paper>
        </div>
    );
}
