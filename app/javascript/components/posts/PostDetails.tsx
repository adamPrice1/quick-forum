import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom'
import getPost from '../../utils/getPost';
import AddComment from '../comments/AddComment'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';


const PostDetails = () => {

    const { id } = useParams();

    const { post, loading} = getPost(id);

    const [commentModalOpen, setCommentModalOpen] = React.useState(false)

    if (loading) {
        return (
            <></>
        )
    }

    return (
        <>
            <Container>
                <Box sx={{ padding: '10px' }}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5">
                                {post.title}
                            </Typography>
                            <Typography variant="body2">
                                {post.content}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size='small'
                                onClick={() => {
                                    setCommentModalOpen(true)
                                }}
                            >
                                Comment
                            </Button>
                        </CardActions>

                    </Card>

                    <Stack>
                        {post.comments.map(comment => (
                            <Box key={comment.id} sx={{ padding: '10px' }}>
                                <Card sx={{ maxWidth: 300, backgroundColor: 'LightGray' }}>
                                    <CardContent>
                                        <Stack direction='row' justifyContent="space-between">
                                            <Typography variant="body2" >
                                                {comment.content}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'grey' }}>
                                                {comment.user.username}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Stack>


                </Box>
            </Container>

            <AddComment open={commentModalOpen} setOpen={setCommentModalOpen} post={post} />
        </>
    )
}

export default PostDetails;
