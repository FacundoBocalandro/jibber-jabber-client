import React, {useEffect, useState} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import {MessageSender} from "./MessageSender.js";
import { MessageLeft, MessageRight } from "./Message";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import {useUserInfo} from "../UserInfoContext";

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
            justifyContent: "center",
            marginBottom: '15px'
        },
        messagesBody: {
            width: "calc( 100% - 20px )",
            margin: 10,
            overflowY: "scroll",
            height: "calc( 100% - 80px )",
            minHeight: "30vh",
            padding: 10
        }
    })
);

let stompClient;

export const ChatBox = ({user}) => {
    const {userInfo} = useUserInfo();
    const [connected, setConnected] = useState();
    const [messages, setMessages] = useState([]);

    const incomingMessage = (chatMessage) => {
        if (JSON.parse(chatMessage.body).sender === user.id) {
            setMessages([...messages, {
                author: user,
                text: JSON.parse(chatMessage.body).content,
                timestamp: Date.now()
            }]);
        }
    }


    const connect = (username, incomingMessage) => {
        let socket = new SockJS('messages/chat');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            setConnected(true);
            stompClient.subscribe('/topic/messages/' + userInfo.id, (chatMessage) => {
                incomingMessage(chatMessage);
            });
        });
    }

    useEffect(() => {
        let head = document.head;
        let link = document.createElement("link");
        link.rel = "stylesheet";

        link.href = "https://unpkg.com/@progress/kendo-theme-material@latest/dist/all.css";
        let link2 = document.createElement("link");
        link2.rel = "stylesheet";
        link2.integrity = "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T";
        link2.crossOrigin = "anonymous";
        link2.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
        head.prepend(link);

        head.appendChild(link2);
        connect(userInfo.id, incomingMessage);

        return () => {
            if (connected) {
                stompClient.disconnect();
                setConnected(false);
            }
        }
    },[]);

    const sendNewMessage = (message) => {
        setMessages([...messages, {
            author: userInfo,
            text: message,
            timestamp: Date.now()
        }]);
        stompClient.send(`/chat/${user.id}/${userInfo.id}`, {}, JSON.stringify({
            'sender': userInfo.id,
            'content': message
        }));
    };


    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Paper className={classes.paper} zDepth={2}>
                <Paper id="style-1" className={classes.messagesBody}>
                    {messages.map(message => message.author.id === user.id ?
                        <MessageLeft
                            message={message.text}
                            timestamp={new Date(message.timestamp).toLocaleString()}
                            photoURL=""
                            displayName={`${message.author.firstName} ${message.author.lastName}`}
                            avatarDisp={true}
                        /> :
                        <MessageRight
                            message={message.text}
                            timestamp={new Date(message.timestamp).toLocaleString()}
                            photoURL=""
                            displayName={`${message.author.firstName} ${message.author.lastName}`}
                            avatarDisp={true}
                        />)
                    }
                </Paper>
                <MessageSender sendNewMessage={sendNewMessage}/>
            </Paper>
        </div>
    );
}
