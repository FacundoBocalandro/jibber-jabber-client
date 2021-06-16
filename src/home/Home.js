import React, {useEffect, useState} from "react";
import "./Home.css";
import Posts from "../posts/Posts";
import NewPost from "../posts/NewPost";
import {deleteRequest, get, put} from "../utils/http";
import {useUserInfo} from "../UserInfoContext";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const {userInfo} = useUserInfo();

    useEffect(() => {
        get('posts')
            .then(res => {
                setPosts(res);
            })
    }, [])

    const likePost = (id) => {
        put(`posts/like/${id}`)
            .then(() => {
                setPosts(posts.map(post => {
                    if (post.id === id) {
                        return {...post, likes: [...post.likes, userInfo.id]}
                    }
                    return post;
                }))
            })
    }

    const dislikePost = (id) => {
        deleteRequest(`posts/dislike/${id}`)
            .then(() => {
                setPosts(posts.map(post => {
                    if (post.id === id) {
                        return {...post, likes: post.likes.filter(userId => userId !== userInfo.id)}
                    }
                    return post;
                }))
            })
    }

    const deletePost = (id) => {
        deleteRequest(`posts/delete/${id}`)
            .then(() => {
                setPosts(posts.filter(post => post.id !== id));
            })
    }

    const addPost = (post) => {
        setPosts([post, ...posts]);
    }

    return (
        <div className={"home-screen"}>
            <div className={"posts-container"}>
                <NewPost addPost={addPost}/>
                <Posts posts={posts} likePost={likePost} dislikePost={dislikePost} deletePost={deletePost}/>
            </div>
        </div>
    )
}

export default Home;
