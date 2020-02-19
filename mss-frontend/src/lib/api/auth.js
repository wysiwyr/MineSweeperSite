import client from "./client";

// 로그인 api 요청
export const login = ({username, password}) =>
    client.post('/api/auth/login', {username, password});

// 회원가입 api 요청
export const register = ({username, password}) =>
    client.post('/api/auth/register', {username, password});

// 로그인 확인 api 요청
export const check = () =>
    client.get('/api/auth/check');

// 로그아웃
export const logout = () =>
    client.post('/api/auth/logout');
