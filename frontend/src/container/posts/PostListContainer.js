import React, {useEffect} from "react";
import qs from 'qs';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import PostList from "../../components/post/PostList";
import {listPosts} from "../../modules/posts";

const PostListContainer = ({match, location}) => {
    const dispatch = useDispatch();
    const {posts, error, loading, user} = useSelector(
        ({posts, loading, user}) => ({
            posts: posts.posts,
            error: posts.error,
            loading: loading['posts/LIST_POSTS'],
            user: user.user,
        }),
    );

    useEffect(() => {
        const {username} = match.params;
        const {page, tag, level} = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        dispatch(listPosts({page, username, tag, level}));
    }, [dispatch, match.params, location.search]);

    return (
        <PostList
            posts={posts}
            error={error}
            loading={loading}
            showStartButton={user}
        />
    );
};

export default withRouter(PostListContainer);
