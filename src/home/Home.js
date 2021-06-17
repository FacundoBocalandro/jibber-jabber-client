import React, {useEffect, useState} from "react";
import "./Home.css";
import Posts from "../posts/Posts";
import NewPost from "../posts/NewPost";
import {deleteRequest, get, put} from "../utils/http";
import {useUserInfo} from "../UserInfoContext";
import {useLocation} from "react-router";
import UserProfile from "../user-profile/UserProfile";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState();
    const [selectedUser, setSelectedUser] = useState();
    const {userInfo} = useUserInfo();
    const location = useLocation();

    useEffect(() => {
        get('auth')
            .then(res => {
                setUsers(res);
            })
    }, [])

    useEffect(() => {
        if (users) {
            let fetchUrl = 'posts';
            if (location.search.includes("userId")) {
                const userId = location.search.split("=")[1];
                fetchUrl = `posts/user-posts/${userId}`;
                setSelectedUser(users.find(user => user.id.toString() === userId));
            }
            else setSelectedUser(null);

            get(fetchUrl)
                .then(res => {
                    setPosts(res || []);
                })
        }
    }, [location, users])

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
                {
                    selectedUser ?
                        <UserProfile user={selectedUser}/> :
                        <NewPost addPost={addPost}/>
                }
                <Posts posts={posts} likePost={likePost} dislikePost={dislikePost} deletePost={deletePost}/>
            </div>
        </div>
    )
}

export default Home;
