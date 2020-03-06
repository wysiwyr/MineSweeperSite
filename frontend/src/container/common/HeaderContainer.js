import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {withRouter} from 'react-router-dom';
import Header from "../../components/common/Header";
import {logout} from "../../modules/user";

const HeaderContainer = ({history}) => {
    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch(logout());
        history.push('/');
    }, [dispatch, history]);
    return <Header onLogout={onLogout}/>
};

export default withRouter(HeaderContainer);
