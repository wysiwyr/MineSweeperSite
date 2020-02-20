import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import palette from "../../lib/styles/palette";

const StyledTags = styled.div`
    margin-top: 0.5rem;
    .tag{
        display: inline-block;
        color: ${palette.gray[7]};
        text-decoration: none;
        margin-right: 0.5rem;
        &:hover {
            color: ${palette.cyan[6]}
        }
    }
`;

const Tags = ({tags}) => {
    return (
        <StyledTags>
            {tags.map(tag => (
                <Link className={"tag"} to={`/?tag=${tag}`} key={tag}>
                    #{tag}
                </Link>
            ))}
        </StyledTags>
    )
};

export default Tags;