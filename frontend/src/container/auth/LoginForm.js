import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {changeField, enterForm, leaveForm, login} from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import {check} from "../../modules/user";
import {withRouter} from 'react-router-dom';

const LoginForm = ({history}) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const {form, initialize, auth, authError, user} = useSelector(({auth, user}) => ({
        form: auth.login,
        initialize: auth.initialize,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }), shallowEqual);

    // 값 변경 이벤트 핸들러
    const onChange = useCallback(e => {
        const {name, value} = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        )
    }, [dispatch]);

    // 폼 등록 이벤트 핸들러
    const onSubmit = useCallback(e => {
        e.preventDefault();
        const {username, password} = form;
        dispatch(login({username, password}));
    }, [dispatch, form]);

    // 컴포넌트가 처음 렌더링 되거나 페이지를 떠날 때 form을 초기화함
    useEffect(() => {
        dispatch(enterForm('login'));

        return() => {
            dispatch(leaveForm('login'));
        }
    }, [dispatch]);

    // 로그인 성공/실패 처리
    useEffect(() => {
        if (initialize === 'login') {
            if (authError) {
                if (authError.response.status === 401) {
                    setError('아이디 또는 비밀번호가 일치하지 않습니다');
                    return;
                }
                setError('로그인 실패');
                return;
            }
            if (auth) {
                dispatch(check());
            }
        }
    }, [initialize, auth, authError, dispatch]);

    // user 값이 잘 설정되었는지 확인
    useEffect(() => {
        if (user) {
            history.push('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }

    }, [history, user]);

    return (
        <AuthForm
            type={"login"}
            form={form}
            error={error}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
};

export default React.memo(withRouter(LoginForm));
