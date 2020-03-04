import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from 'react-router-dom';
import {changeField, enterForm, leaveForm, register} from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import {check} from "../../modules/user";

const RegisterForm = ({history}) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const {form, initialize, auth, authError, user} = useSelector(({auth, user}) => ({
        form: auth.register,
        initialize: auth.initialize,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    // 값 변경 이벤트 핸들러
    const onChange = e => {
        const {name, value} = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        )
    };

    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const {username, password, passwordConfirm} = form;
        if ([username, password, passwordConfirm].includes('')) {
            setError('빈칸을 모두 입력해 주세요');
            return;
        }
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다');
            dispatch(changeField({form: 'register', key: 'password', value: ''}));
            dispatch(changeField({form: 'register', key: 'passwordConfirm', value: ''}));
            return;
        }
        dispatch(register({username, password}));
    };

    // 컴포넌트가 처음 렌더링될 떼 form을 초기화함
    useEffect(() => {
        dispatch(enterForm('register'));

        return() => {
            dispatch(leaveForm('register'));
        }
    }, [dispatch]);

    // 회원가입 성공/실패 처리
    useEffect(() => {
        if (initialize === 'register') {
            if (authError) {
                if (authError.response.status === 409) {
                    setError('이미 존재하는 계정입니다');
                    return;
                }
                setError('회원가입 실패');
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
            type={"register"}
            form={form}
            error={error}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
};

export default withRouter(RegisterForm);
