import * as React from "react"
import axios from 'axios'
import { UserContext } from "../utils/UserContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuBar from "./navigation/MenuBar";
import LoginModal from "./LoginModal";
import Posts from "./posts/Posts";
import PostDetails from './posts/PostDetails'


const App = () => {


    const [user, setUser] = React.useState(null);


    React.useEffect(() => {
        axios.get('http://localhost:3001/logged_in')
            .then(response => {
                if (response.data.logged_in) {
                    setUser(response.data.user)
                }
            })
    }, []);

    return (
        <UserContext.Provider value={{
            loggedIn: user ? true : false,
            user: user,
            setUser: setUser
        }}>
            <MenuBar />
            <LoginModal />

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Posts />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/my-posts" element={<Posts user_id={
                        user ? user.id : null
                    } />} />
                    <Route path="/post/:id" element={<PostDetails/>} />
                </Routes>

            </BrowserRouter>

        </UserContext.Provider>
    )
}

export default App;
