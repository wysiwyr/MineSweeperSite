import React, {useEffect, useCallback} from "react";
import Editor from "../../components/write/Editor";
import {useSelector, useDispatch} from "react-redux";
import {initialize, changeField} from "../../modules/write";

const EditorContainer = () => {
    const dispatch = useDispatch();
    const {title, body} = useSelector(({write}) => ({
        title: write.title,
        body: write.body,
    }));
    const onChangeField = useCallback(payload => dispatch(changeField(payload)),
        [dispatch]);

    // 페이지를 떠날 때 데이터 초기화
    useEffect(() => {
        return () => {
            dispatch(initialize());
        }
    }, [dispatch]);

    return <Editor onChangeField={onChangeField} title={title} body={body}/>;
};

export default EditorContainer;
