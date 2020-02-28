import {createAction, handleActions} from 'redux-actions';
import produce from "immer";
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequsetActionType} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const ENTER_FORM = 'auth/ENTER_FORM';
const LEAVE_FORM = 'auth/LEAVE_FORM';
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequsetActionType('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequsetActionType('auth/LOGIN');

export const changeField = createAction(
    CHANGE_FIELD,
    ({form, key, value}) => ({
        form,   // register, login
        key,    // username, password, passwordConfirm
        value,  // 입력된 값
    })
);
export const enterForm = createAction(ENTER_FORM, form => form);
export const leaveForm = createAction(LEAVE_FORM);
export const register = createAction(REGISTER, ({username, password}) => ({
    username,
    password
}));
export const login = createAction(LOGIN, ({username, password}) => ({
    username,
    password
}));

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
    },
    initialize: '',
    auth: null,
    authError: null,
};

export default handleActions(
    {
        [CHANGE_FIELD]: (state, {payload: {form, key, value}}) =>
            produce(state, draft => {
                draft[form][key] = value;
            }),
        [ENTER_FORM]: (state, {payload: form}) => ({
            ...state,
            [form]: initialState[form],
            initialize: form,
            auth: null,
            authError: null,
        }),
        [LEAVE_FORM]: state => ({
            ...state,
            initialize: '',
            auth: null,
            authError: null,
        }),
        [REGISTER]: (state) => ({
            ...state,
            auth: null,
            authError: null,
        }),
        [REGISTER_SUCCESS]: (state, {payload: auth}) => ({
            ...state,
            auth,
        }),
        [REGISTER_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,
        }),
        [LOGIN]: (state) => ({
            ...state,
            auth: null,
            authError: null,
        }),
        [LOGIN_SUCCESS]: (state, {payload: auth}) => ({
            ...state,
            auth,
        }),
        [LOGIN_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,
        }),
    },
    initialState
);
