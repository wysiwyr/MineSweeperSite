import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import Responsive from "../common/Responsive";
import SubInfo from "../common/SubInfo";
import Tags from '../common/Tags';

const StyledPostList = styled(Responsive)`
    margin-top: 3rem
`;

const GameStartButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;

const StyledPostItem = styled.div`
    padding: 3rem 0;
    &:first-child {
        padding-top: 0;
    }
    & + & {
        border-top: 1px solid ${palette.gray[2]};
    }
    
    h2 {
        font-size: 2rem;
        margin-bottom: 0;
        margin-top: 0;
        &:hover {
            color: ${palette.gray[6]};
        }
    }
    p {
       margin-top: 1.5rem;
    }
`;

const PostItem = ({post}) => {
    const {_id, title, level, time, body, user, publishedDate, tags} = post;

    return (
        <StyledPostItem>
            <h2>
                <Link to={`/@${user.username}/${_id}`}>
                    {title}
                </Link>
            </h2>
            <SubInfo
                username={user.username}
                level={level}
                time={time}
                publishedDate={publishedDate}
            />
            <Tags
                tags={tags}
            />
            <p>{body}</p>
        </StyledPostItem>
    )
};

const PostList = ({posts, error, loading, showStartButton}) => {
    if (error) {
        return <StyledPostList>에러가 발생했습니다!</StyledPostList>
    }

    return (
        <StyledPostList>
            <GameStartButtonWrapper>
                {showStartButton && (
                    <Button to={"/game"} cyan>
                        게임 시작!
                    </Button>
                )}
            </GameStartButtonWrapper>
            <div>
                {!loading && posts && (
                    posts.map(post => (
                        <PostItem post={post} key={post._id}/>
                    ))
                )}
            </div>
        </StyledPostList>
    )
};

export default PostList;

