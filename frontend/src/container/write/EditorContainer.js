import React, {useEffect, useCallback} from "react";
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import {withRouter} from 'react-router-dom';
import Editor from "../../components/write/Editor";
import {initialize, changeField} from "../../modules/write";

const EditorContainer = ({history}) => {
    const dispatch = useDispatch();
    const {user, title, body, level, time} = useSelector(({user, write, game}) => ({
        user: user.user,
        title: write.title,
        body: write.body,
        level: game.level ? game.level : write.originalLevel,
        time: game.time ? game.time : write.originalTime,
    }), shallowEqual);
    const onChangeField = useCallback(payload => dispatch(changeField(payload)),
        [dispatch]);

    // 페이지를 떠날 때 데이터 초기화
    useEffect(() => {
        if (user === null || time === null) {
            alert('올바른 접근이 아닙니다!!!');
            history.push('/');
        }
        return () => {
            dispatch(initialize());
        }
    }, [dispatch, user, time, history]);

    return (
        <Editor
            title={title}
            body={body}
            level={level}
            time={time}
            onChangeField={onChangeField}
        />
    )
};

export default withRouter(EditorContainer);
