import React, {useCallback} from "react";
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import {withRouter} from 'react-router-dom';
import Header from "../../components/common/Header";
import {logout} from "../../modules/user";

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
