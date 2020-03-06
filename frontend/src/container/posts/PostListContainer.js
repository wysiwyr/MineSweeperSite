import React, {useCallback, useEffect, useRef} from "react";
import qs from "qs";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import PostList from "../../components/post/PostList";
import {listPosts} from "../../modules/posts";

const PostListContainer = ({match, location, history}) => {
    const searchType = useRef('username');
    const searchFor = useRef('');
    const dispatch = useDispatch();
    const {posts, error, loading} = useSelector(
        ({posts, loading}) => ({
            posts: posts.posts,
            error: posts.error,
            loading: loading['posts/LIST_POSTS'],
        }), shallowEqual);

    const onSearchSubmit = useCallback((e) => {
        e.preventDefault();
        if (searchType.current === 'username') {
            history.push(`/@${searchFor.current}`);
        } else {
            const query = qs.stringify({[searchType.current]: searchFor.current});
            history.push(`/?${query}`);
        }
    }, [history]);

    const onSearchTypeChange = useCallback((e) => {
        searchType.current = e.target.value;
    }, []);

    const onSearchForChange = useCallback((e) => {
        searchFor.current = e.target.value;
    }, []);

    useEffect(() => {
        console.log(match.url);
        if (match.url === '/') {
            searchType.current = 'username';
            searchFor.current = '';
        }
    });

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
            onSearchSubmit={onSearchSubmit}
            onSearchTypeChange={onSearchTypeChange}
            onSearchForChange={onSearchForChange}
        />
    );
};

export default withRouter(PostListContainer);
