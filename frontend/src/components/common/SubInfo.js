import React from "react";
import styled, {css} from "styled-components";
import {Link} from "react-router-dom";
import palette from "../../lib/styles/palette";

const StyledSubInfo = styled.div`
    ${props =>
        props.hasMarginTop &&
        css`
            margin-top: 1rem;
        `
    }
    color: ${palette.gray[6]};
    
    span + span:before {
        color: ${palette.gray[5]};
        padding: 0 0.25rem;
        content: '\\\\B7'; /* 가운뎃점 문자 */
    }
`;

const SubInfo = ({username, publishedDate, hasMarginTop}) => {
    return (
        <StyledSubInfo hasMarginTop={hasMarginTop}>
            <span>
                <b>
                    <Link to={`/@${username}`}>{username}</Link>
                </b>
                <span>{new Date(publishedDate).toLocaleDateString()}</span>
            </span>
        </StyledSubInfo>
    )
};

export default SubInfo;
