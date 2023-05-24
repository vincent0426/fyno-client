import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./context/AuthContext";
import { FlashProvider } from "./context/FlashContext";
import Header from "./layouts/Header";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Oops from "./pages/Oops";
import CreatePost from "./pages/CreatePost";
import Hero from "./pages/Hero";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import SinglePost from "./pages/SinglePost";
import { compose } from "./utils/utils";

function App() {
    const Provider = compose([FlashProvider, AuthProvider]);
    return (
        <>
            <ToastContainer
                closeOnClick
                draggable
                pauseOnFocusLoss
                pauseOnHover
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                position="top-center"
                rtl={false}
                theme="light"
            />
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
                            <Route element={<Oops />} path="/Oops" />
                        </Route>
                    </Routes>
                </Provider>
            </Router>
        </>
    );
}

export default App;
