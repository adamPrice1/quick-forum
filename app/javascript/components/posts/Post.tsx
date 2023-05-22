import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PostType from '../../types/Post';

interface props {
    post: PostType
}

const Post = ({ post }: props) => {

    const handleViewComments = () => {
        window.location.href = `/post/${post.id}`
    }
    return (
        <Box sx={{padding: '10px'}}>
            <Card variant="outlined">
                <CardContent>
                    <Stack direction='row' justifyContent="space-between">
                        <Typography variant="h5">
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'grey' }}>
                            {post.user.username}
                        </Typography>
                    </Stack>

                    <Typography variant="body2">
                        {post.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleViewComments}>View Comments</Button>
                </CardActions>
            </Card>
        </Box>

    )
}

export default Post;
