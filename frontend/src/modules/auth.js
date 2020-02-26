import {createAction, handleActions} from 'redux-actions';
import produce from "immer";
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequsetActionType} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
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
export const initializeForm = createAction(INITIALIZE_FORM, form => form);
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
    auth: null,
    authError: null,
};

export default handleActions(
    {
        [CHANGE_FIELD]: (state, {payload: {form, key, value}}) =>
            produce(state, draft => {
                draft[form][key] = value;
            }),
        [INITIALIZE_FORM]: (state, {payload: form}) => ({
            ...state,
            [form]: initialState[form],
        }),
        [REGISTER_SUCCESS]: (state, {payload: auth}) => ({
            ...state,
            auth,
            authError: null,
        }),
        [REGISTER_FAILURE]: (state, {payload: error}) => ({
            ...state,
            auth: null,
            authError: error,
        }),
        [LOGIN_SUCCESS]: (state, {payload: auth}) => ({
            ...state,
            auth,
            authError: null,
        }),
        [LOGIN_FAILURE]: (state, {payload: error}) => ({
            ...state,
            auth: null,
            authError: error,
        }),
    },
    initialState
);
