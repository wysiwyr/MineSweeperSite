import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import PostListPage from "./pages/PostListPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import WritePage from "./pages/WritePage";

const App = () => {
    return (
        <>
            <Route component={PostListPage} path={["/@:username", "/"]} exact/>
            <Route component={RegisterPage} path={"/register"}/>
            <Route component={LoginPage} path={"/login"}/>
            <Route component={PostPage} path={"/@:username/:postId"}/>
            <Route component={WritePage} path={"/write"}/>
        </>
    );
}

export default App;
