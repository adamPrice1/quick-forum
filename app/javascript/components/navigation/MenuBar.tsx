import * as React from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {UserContext} from '../../utils/UserContext';
import axios from 'axios'
import {
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container
} from '@mui/material';
import NewPost from '../posts/NewPost';

const MenuBar = () => {

  const {setUser} = React.useContext(UserContext)

  const handleLogout = () => {
    axios.post('http://localhost:3001/logout')
    .then(response => {
      if(response.data.logged_out){
        setUser(null);
      }
    })
  }

  const [newPostOpen, setNewPostOpen] = React.useState(false);

  return (
    <>
    <AppBar position="static">
      <Container>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center"
          }}
          disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            QUICK FORUM
          </Typography>

          <Stack direction='row'>
            <IconButton onClick={()=>{setNewPostOpen(true)}}>
              <AddCircleIcon />
              NEW POST
            </IconButton>

            <IconButton href="/my-posts">
              <AccountCircleIcon />
              MY POSTS
            </IconButton>

            <IconButton
              onClick={handleLogout}
            >
              <AccountCircleIcon />
              LOGOUT
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
    <NewPost open={newPostOpen} setOpen={setNewPostOpen} />
    </>
  )

}

export default MenuBar;
