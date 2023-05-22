import * as React from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Post from '../../types/Post';
import { UserContext } from '../../utils/UserContext'

interface props {
    open: boolean,
    setOpen: (boolean),
    post: Post
}

const AddComment = ({ open, setOpen, post }: props) => {

    const {user} = React.useContext(UserContext)
    const [comment, setComment] = React.useState("");

    const handleCreateComment = () => {
        axios.post('http://localhost:3001/create-comment',
            {
                "comment": {
                    "post_id": post.id,
                    "user_id": user.id,
                    "content": comment
                }
            },
            { withCredentials: true })
            .then(response => {
                if (response.data.status == "created") {
                    console.log(response.data.comment)
                    setOpen(false);
                }
            })
    }




    return (
        <Dialog open={open}>
            <DialogTitle>Add Comment</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="comment"
                    label="Comment"
                    fullWidth
                    variant="standard"
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setOpen(false) }}>Cancel</Button>
                <Button onClick={handleCreateComment}>Add Comment</Button>
            </DialogActions>
        </Dialog>
    )

}

export default AddComment;
