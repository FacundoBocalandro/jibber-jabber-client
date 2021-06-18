import React, {useState} from 'react';
import "./Posts.css";
import Avatar from "@material-ui/core/Avatar";
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {useUserInfo} from "../UserInfoContext";

const Posts = ({posts, dislikePost, likePost, deletePost}) => {
    const {userInfo} = useUserInfo();
    const [colors, setColors] = useState({
        [userInfo.id]: '#3f51b5'
    })

    const randomColor = (userId) => {
        const prevColor = colors[userId];
        if (prevColor) return prevColor;

        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        setColors({...colors, [userId]: color})
        return color;
    }


    return (
        <div className={"posts-list"}>
            {posts.map(post => <Post post={post} userInfo={userInfo}
                                     dislikePost={dislikePost}
                                     likePost={likePost} deletePost={deletePost} randomColor={randomColor}/>)}
        </div>
    )
}

const Post = ({post, userInfo, dislikePost, likePost, randomColor, deletePost}) => {

    return (
        <div className={"post-container"}>
            <div className={"post-text-container"}>
                <Avatar style={{backgroundColor: `${randomColor(post.userId)}`}}>{post.username.charAt(0).toUpperCase()}</Avatar>
                <div className={"post-username-and-text"}>
                    <div className={"post-username"}>@{post.username}</div>
                    <div className={"post-text"}>{post.text}</div>
                </div>
            </div>
            <div className={"post-footer"}>
                {post.userId === userInfo.id && <DeleteOutlinedIcon className={"delete-icon"} onClick={() => deletePost(post.id)}/>}
                {post.likes.some(userId => userId === userInfo.id) ?
                    <StarIcon className={"liked-star"} onClick={() => dislikePost(post.id)}/> :
                    <StarOutlineIcon className={"disliked-star"} onClick={() => likePost(post.id)}/>}
            </div>
        </div>
    )
}

export default Posts
