import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {createRequsetActionType} from "../lib/createRequestSaga";
import * as postAPI from '../lib/api/posts';
import {takeLatest} from 'redux-saga/effects';

const [
    READ_POST,
    READ_POST_SUCCESS,
    READ_POST_FAILURE
] = createRequsetActionType('post/POST_READ');
const UNLOAD_POST = 'post/UNLOAD_POST'; // 포스트 페이지에서 벗어날 때 데이터 지우기

export const readPost = createAction(READ_POST, id => id);
export const unloadPost = createAction(UNLOAD_POST);

const readPostSaga = createRequestSaga(READ_POST, postAPI.readPost);

export function* postSaga() {
    yield takeLatest(READ_POST, readPostSaga);
}

const initialState = {
    post: null,
    error: null,
};

export default handleActions(
    {
        [READ_POST_SUCCESS]: (state, {payload: post}) => ({
            ...state,
            post: post,
            error: null,
        }),
        [READ_POST_FAILURE]: (state, {payload: error}) => ({
            ...state,
            post: null,
            error: error,
        }),
        [UNLOAD_POST]: () => initialState,
    },
    initialState,
);
