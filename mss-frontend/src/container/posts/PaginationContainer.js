import React from "react";
import {useSelector} from "react-redux";
import {withRouter} from 'react-router-dom';
import qs from 'qs';
import Pagination from "../../components/post/Pagination";

const PaginationContainer = ({match, location}) => {
    const {posts, loading, lastPage} = useSelector(({posts, loading}) => ({
        posts: posts.posts,
        loading: loading['posts/LIST_POSTS'],
        lastPage: posts.lastPage,
    }));

    if (!posts || loading) return null;

    const {username} = match.params;
    const {page = 1, tag} = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    return (
        <Pagination
            page={page}
            lastPage={lastPage}
            username={username}
            tag={tag}
        />
    )
};

export default withRouter(PaginationContainer);