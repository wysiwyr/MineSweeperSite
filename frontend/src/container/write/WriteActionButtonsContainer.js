import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {withRouter} from "react-router-dom";
import {writePost, updatePost} from "../../modules/write";
import WriteActionButtons from "../../components/write/WriteActionButton";

const WriteActionButtonsContainer = ({history}) => {
    const dispatch = useDispatch();
    const {title, body, tags, post, postError, originalPostId, level, time} = useSelector(({write, game}) => ({
        title: write.title,
        body: write.body,
        tags: write.tags,
        post: write.post,
        postError: write.postError,
        originalPostId: write.originalPostId,
        level: game.level,
        time: game.time,
    }));

    const onPublish = () => {
        if (originalPostId) {
            dispatch(
                updatePost(
                    {
                        id: originalPostId,
                        title,
                        body,
                        tags,
                    }
                )
            );
            return;
        }
        dispatch(
            writePost({
                title,
                level,
                time,
                body,
                tags
            }),
        );
    };

    const onCancel = () => {
        history.goBack();
    };

    useEffect(() => {
        if (post) {
            const {_id, user} = post;
            history.push(`/@${user.username}/${_id}`);
        }

        if (postError) {
            console.log(postError);
        }
    }, [history, post, postError]);

    return (
        <WriteActionButtons
            onPublished={onPublish}
            onCancel={onCancel}
            isEdit={!!originalPostId}
        />
    )
};

export default withRouter(WriteActionButtonsContainer);
