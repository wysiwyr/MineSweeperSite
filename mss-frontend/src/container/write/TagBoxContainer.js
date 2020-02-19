import React from "react";
import {useSelector, useDispatch} from "react-redux";
import TagBox from "../../components/write/TagBox";
import {changeField} from "../../modules/write";

const TagBoxContainer = () => {
    const dispatch = useDispatch();
    const tags = useSelector(state => state.write.tags);

    const onChangeTags = newTags => {
        dispatch(changeField({
                key: 'tags',
                value: newTags,
            }),
        );
    };

    return <TagBox onChangeTags={onChangeTags} tags={tags}/>;
};

export default TagBoxContainer;
