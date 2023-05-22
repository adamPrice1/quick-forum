import axios from 'axios';
import * as React from 'react'

const getPost = (id) => {
    const [post, setPost] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");
    React.useEffect(()=> {
        axios.get('http://localhost:3001/api/post', {
        params: {id: id}
    })
    .catch((error) => {
        setError(error)
    })
    .then(response => {
        setPost(response.data)
        setLoading(false)
    })
    }, [id])

    return {post, loading, error}
}

export default getPost;
