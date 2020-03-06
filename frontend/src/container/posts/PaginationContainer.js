import React from "react";
import {useSelector, shallowEqual} from "react-redux";
import {withRouter} from "react-router-dom";
import qs from "qs";
import Pagination from "../../components/post/Pagination";

const PaginationContainer = ({match, location}) => {
    const {posts, loading, lastPage} = useSelector(({posts, loading}) => ({
        posts: posts.posts,
        loading: loading['posts/LIST_POSTS'],
        lastPage: posts.lastPage,
    }), shallowEqual);

    if (!posts || loading) return null;

    const {username} = match.params;
    const {page = '1', tag, level} = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    return (
        <Pagination
            page={parseInt(page, 10)}
            lastPage={parseInt(lastPage, 10)}
            username={username}
            tag={tag}
            level={level}
        />
    )
};

export default withRouter(PaginationContainer);
