import axios from 'axios';
import * as React from 'react'

const getPosts = (user_id = null) => {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");
    React.useEffect(()=> {
        axios.get('http://localhost:3001/api/posts', {
        params: user_id ? user_id: user_id
    })
    .catch((error) => {
        setError(error)
    })
    .then(response => {
        setPosts(response.data)
        setLoading(false)
    })
    }, [user_id])

    return {posts, loading, error}
}

export default getPosts;
