import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import WebSocketComponent from "./components/WebSocket";
import { AuthProvider } from "./context/AuthContext";
import Header from "./layouts/Header";
import CreatePost from "./pages/CreatePost";
import Hero from "./pages/Hero";
import Posts from "./pages/Posts";
import SignUp from "./pages/SignUp";
import { compose } from "./utils/utils";

function App() {
    const Provider = compose([AuthProvider]);
    return (
        <Router>
            <Provider>
                <Routes>
                    <Route element={<Header />}>
                        <Route element={<Hero />} path="/" />
                        <Route element={<SignUp />} path="/sign-up" />
                        <Route element={<CreatePost />} path="/create-post" />
                        <Route element={<Posts />} path="/posts" />
                        <Route element={<WebSocketComponent />} path="/ws/:username" />
                    </Route>
                </Routes>
            </Provider>
        </Router>
    );
}

export default App;
