import React, {useState} from "react";
import {post} from "../utils/http";
import "./NewPost.css";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import {useUserInfo} from "../UserInfoContext";

const NewPost = ({addPost}) => {

    const {userInfo} = useUserInfo();

    const emptyPost = {
        text: "",
    }

    const [newPost, setNewPost] = useState({...emptyPost});

    const createPost = () => {
        post('posts/create', newPost)
            .then(res => {
                addPost({...res, likes: []})
                setNewPost({...emptyPost})
            })
    }


    return (
        <div className={"new-post-container"}>
            <div className={"new-post-input-container"}>
                <Avatar className={"new-post-avatar"}>{userInfo.username.charAt(0).toUpperCase()}</Avatar>
                <textarea value={newPost.text}
                           cols={4}
                           maxLength={140}
                           className={"new-post-input"}
                           onChange={e => setNewPost({...newPost, text: e.target.value})}
                           placeholder={"¿Qué está pasando?"}/>
            </div>
            <div className={"new-post-footer"}>
                <Button onClick={createPost} disabled={!newPost.text} color={"primary"}
                        variant={"contained"}>Post</Button>
                <div className={"new-post-counter"}>{140 - newPost.text.length}</div>
            </div>
        </div>
    )
}

export default NewPost;
