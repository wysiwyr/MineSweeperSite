import {createAction, handleActions} from "redux-actions";
import {takeLatest} from "redux-saga/effects";
import createRequestSaga, {createRequsetActionType} from "../lib/createRequestSaga";
import * as postAPI from "../lib/api/posts";

const INITIALIZE = 'write/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // 특정 key 값 바꾸기
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST'; // 포스트 수정시 포스트 내용 세팅
const [
    WRITE_POST,
    WRITE_POST_SUCCESS,
    WRITE_POST_FAILURE
] = createRequsetActionType('write/WRITE_POST');
const [
    UPDATE_POST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILURE
] = createRequsetActionType('write/UPDATE_POST');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({key, value}) => ({
    key,
    value,
}));
export const setOriginalPost = createAction(SET_ORIGINAL_POST, post => post);
export const writePost = createAction(WRITE_POST,
    ({title, level, time, body, tags}) => ({
        title,
        level,
        time,
        body,
        tags,
    }));
export const updatePost = createAction(UPDATE_POST,
    ({id, title, body, tags}) => ({
        id,
        title,
        body,
        tags,
    }));

const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postAPI.updatePost);

export function* writeSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
    yield takeLatest(UPDATE_POST, updatePostSaga);
}

const initialState = {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null,
    originalPostId: null,
    originalLevel: null,
    originalTime: null,
};

export default handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_FIELD]: (state, {payload: {key, value}}) => ({
            ...state,
            [key]: value,
        }),
        [WRITE_POST]: state => ({
            ...state,
            post: null,
            postError: null,
        }),
        [WRITE_POST_SUCCESS]: (state, {payload: post}) => ({
            ...state,
            post: post,
        }),
        [WRITE_POST_FAILURE]: (state, {payload: postError}) => ({
            ...state,
            postError: postError,
        }),
        [SET_ORIGINAL_POST]: (state, {payload: post}) => ({
            ...state,
            title: post.title,
            body: post.body,
            tags: post.tags,
            originalPostId: post._id,
            originalLevel: post.level,
            originalTime: post.time,
        }),
        [UPDATE_POST_SUCCESS]: (state, {payload: post}) => ({
            ...state,
            post: post,
            postError: null,
        }),
        [UPDATE_POST_FAILURE]: (state, {payload: postError}) => ({
            ...state,
            post: null,
            postError: postError,
        }),
    },
    initialState
);
