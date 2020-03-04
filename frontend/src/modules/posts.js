import {createAction, handleActions} from "redux-actions";
import {takeLatest} from "redux-saga/effects";
import createRequestSaga, {createRequsetActionType} from "../lib/createRequestSaga";
import * as postAPI from "../lib/api/posts";

const [
    LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
] = createRequsetActionType('posts/LIST_POSTS');

export const listPosts = createAction(LIST_POSTS, ({page, username, tag, level}) => ({
        page,
        username,
        tag,
        level,
    }),
);

const listPostsSaga = createRequestSaga(LIST_POSTS, postAPI.listPosts);

export function* postsSaga() {
    yield takeLatest(LIST_POSTS, listPostsSaga);
}

const initialState = {
    posts: null,
    error: null,
    lastPage: 1,
};

export default handleActions(
    {
        [LIST_POSTS]: state => ({
            ...state,
            error: null,
        }),
        [LIST_POSTS_SUCCESS]: (state, {payload: posts, meta: response}) => ({
            ...state,
            posts,
            lastPage: parseInt(response.headers['last-page'], 10)
        }),
        [LIST_POSTS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error: error,
        }),
    },
    initialState,
);
