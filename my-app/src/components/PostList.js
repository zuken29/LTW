import { useState, useEffect } from "react"

export const PostList = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {// this will fire on every change
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(err => console.log(err))
    }, []) //pass empty array to only fire once when initial load

    return (
        <div>
            <ul>
                {
                    posts.map(post => {
                        return <li key={post.id}>{post.title}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default PostList;