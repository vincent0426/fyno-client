import "./App.css";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import WebSocketComponent from "./components/WebSocket";
import Header from "./layouts/Header";
import CreatePost from "./pages/CreatePost";
import Hero from "./pages/Hero";
import Posts from "./pages/Posts";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Header />}>
                    <Route element={<Hero />} path="/" />
                    <Route element={<CreatePost />} path="/create-post" />
                    <Route element={<Posts />} path="/posts" />
                    <Route element={<WebSocketComponent />} path="/ws/:username" />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
