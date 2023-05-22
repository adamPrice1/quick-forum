import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import { UserContext } from '../../utils/UserContext'

interface props {
    open: boolean,
    setOpen: (boolean)
}

const NewPost = ({open, setOpen}: props) => {

    const {user} = React.useContext(UserContext)
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");

    const handleCreateComment = () => {
        axios.post('http://localhost:3001/create-post',
            {
                "post": {
                    "title": title,
                    "content": content,
                    "user_id": user.id,
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
                    id="title"
                    label="Title"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                   <TextField
                    autoFocus
                    margin="dense"
                    id="content"
                    label="Content"
                    fullWidth
                    variant="standard"
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setOpen(false) }}>Cancel</Button>
                <Button onClick={handleCreateComment}>Add Post</Button>
            </DialogActions>
        </Dialog>
    )

}

export default NewPost;
