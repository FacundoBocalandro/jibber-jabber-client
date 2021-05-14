import './main.css';
import {useState} from "react";
import {get, post} from "./utils/http";

const emptyPost = {
    text: ""
}

function App() {
    const [newPost, setNewPost] = useState({...emptyPost});
    const [posts, setPosts] = useState([]);

    const createPost = () => {
        post('posts/create', newPost)
            .then(res => {
                setPosts([...posts, res])
                setNewPost({...emptyPost})
            })
    }

    const showPosts = () => {
        get('posts')
            .then(res => {
                setPosts(res);
            })
    }

    return (
        <div className={"app-container"}>
            <div className={"posts-container"}>
                <textarea cols="30" rows="10" placeholder={"Enter text..."}
                          value={newPost.text}
                          onChange={e => setNewPost({...newPost, text: e.target.value})}/>
                <button onClick={createPost}>Create post</button>
                <button onClick={showPosts}>Show all posts</button>
                {posts.map(post => <div>{post.text}</div>)}
            </div>
        </div>
    )
}

export default App;
