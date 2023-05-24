import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./components/PrivateRoute/ProtectedRoute";
import UserProtectedRoute from "./components/PrivateRoute/UserPropectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { FlashProvider } from "./context/FlashContext";
import Header from "./layouts/Header";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Oops from "./pages/Oops";
import CreatePost from "./pages/CreatePost";
import Hero from "./pages/Hero";
import Information from "./pages/Information";
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
                            <Route element={<ProtectedRoute />}>
                                <Route element={<Profile />} path="/profile/:username" />
                                <Route element={<CreatePost />} path="/create-post" />
                                <Route element={<Chat />} path="/chat" />
                            </Route>
                            <Route element={<UserProtectedRoute />}>
                                <Route element={<Auth />} path="/auth" />
                            </Route>
                            <Route element={<Hero />} path="/" />
                            <Route element={<Posts />} path="/posts" />
                            <Route element={<SinglePost />} path="/posts/:id" />
<<<<<<< HEAD
                            <Route element={<Chat />} path="/chat" />
                            <Route element={<Oops />} path="/Oops" />
=======
                            <Route element={<Information />} path="/information" />
>>>>>>> c77463846d3d784509a10bde784c1682fbb5ef66
                        </Route>
                    </Routes>
                </Provider>
            </Router>
        </>
    );
}

export default App;
