import "./App.css";
import "./index.css";

// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
