import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import {UserContext} from '../utils/UserContext'
const LoginModal = () => {


  const {loggedIn, user, setUser} = React.useContext(UserContext)

  const handleLogin = () => {
    axios.post('http://localhost:3001/login',
    {
      "user": {
        "username": username,
        "password": password
      }
    },
    {withCredentials: true})
    .then(response => {
      if (response.data.logged_in){
        console.log(response.data.user)
        setUser(response.data.user)
        console.log(user)
      }
    })
  };

  const handleCreateAccount = () => {
    axios.post('http://localhost:3001/create-user',
    {
      "user": {
        "username": username,
        "password": password,
        "password_confirmation": password
      }
    },
    {withCredentials: true})
    .then(response => {
      if (response.data.status == "created"){
        console.log(response.data.user)
        setUser(response.data.user)
        console.log(user)
      }
    })
  }


  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  if(loggedIn){
    return;
  }

  return (
    <Dialog open={!loggedIn}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Heya
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Username"
          fullWidth
          variant="standard"
          value = {username}
          onChange = { (e) => {
            setUserName(e.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange = {(e)=>{
            setPassword(e.target.value)
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogin}>Login</Button>
        <Button onClick={handleCreateAccount}>Create Account</Button>
      </DialogActions>
    </Dialog>
  )

}

export default LoginModal;
