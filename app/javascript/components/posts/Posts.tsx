import * as React from "react"
import getPosts from '../../utils/getPosts'
import Post from "./Post";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const Posts = (query_params) => {

    const { posts, loading } = getPosts(query_params);

    return (
        <Container>
            <Box sx={{padding: '10px'}}>
                <Stack>
                    {
                        !loading && posts.map(post => {
                            console.log(post);
                            return (<Post key={post.id} post={post} />)
                        })
                    }
                </Stack>
            </Box>

        </Container>

    )
}

export default Posts;
