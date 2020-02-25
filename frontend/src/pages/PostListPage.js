import React from "react";
import HeaderContainer from "../container/common/HeaderContainer";
import PostListContainer from "../container/posts/PostListContainer";
import PaginationContainer from "../container/posts/PaginationContainer";

const PostListPage = () => {
    return (
        <div>
            <HeaderContainer/>
            <PostListContainer/>
            <PaginationContainer/>
        </div>
    )
};

export default PostListPage;