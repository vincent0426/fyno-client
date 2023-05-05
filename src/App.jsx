import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Header from "./layouts/Header";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import CreatePost from "./pages/CreatePost";
import Hero from "./pages/Hero";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import SinglePost from "./pages/SinglePost";
import { compose } from "./utils/utils";

function App() {
    const Provider = compose([AuthProvider]);
    return (
        <Router>
            <Provider>
                <Routes>
                    <Route element={<Header />}>
                        <Route element={<Hero />} path="/" />
                        <Route element={<Auth />} path="/auth" />
                        <Route element={<Profile />} path="/profile/:username" />
                        <Route element={<CreatePost />} path="/create-post" />
                        <Route element={<Posts />} path="/posts" />
                        <Route element={<SinglePost />} path="/posts/:id" />
                        <Route element={<Chat />} path="/chat" />
                    </Route>
                </Routes>
            </Provider>
        </Router>
    );
}

export default App;
