import React, {useCallback} from "react";
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import Header from "../../components/common/Header";
import {logout} from "../../modules/user";
import {withRouter} from 'react-router-dom';

const HeaderContainer = ({history}) => {
    const {user} = useSelector(({user}) => ({user: user.user}), shallowEqual);
    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch(logout());
        history.push('/');
    }, [dispatch, history]);
    return <Header user={user} onLogout={onLogout}/>
};

export default React.memo(withRouter(HeaderContainer));
