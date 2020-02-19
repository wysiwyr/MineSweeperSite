import {createAction, handleActions} from "redux-actions";
import createRequestSaga, {createRequsetActionType} from "../lib/createRequestSaga";
import * as postAPI from '../lib/api/posts';
import {takeLatest} from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // 특정 key 값 바꾸기
const [
    WRITE_POST,
    WRITE_POST_SUCCESS,
    WRITE_POST_FAILURE
] = createRequsetActionType('write/WRITE_POST');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({key, value}) => ({
    key,
    value,
}));
export const writePost = createAction(WRITE_POST, ({title, body, tags}) => ({
    title,
    body,
    tags,
}));

const writePostSaga = createRequestSaga(writePost, postAPI.writePost);
export function* writeSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
}

const initialState = {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null,
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
            post:null,
            postError: null,
        }),
        [WRITE_POST_SUCCESS]: (state, {payload: post}) => ({
            ...state,
            post: post,
        }),
        [WRITE_POST_FAILURE]: (state, {payload: postError}) => ({
            ...state,
            post: null,
            postError: postError,
        }),
    },
    initialState
);
