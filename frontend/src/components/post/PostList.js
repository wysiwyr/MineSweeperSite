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

const FormAndButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
    @media (max-width: 550px) {
        line-height: 1.5rem;
    }
    @media (max-width: 490px) {
        display: block;
        height: 4.6rem;
        a {
            display: block;
            width: 6rem;
            height: 2rem;
        }
    }
`;

const StyledSearchForm = styled.form`
    select {
        width: 6rem;
        height: 2rem;
        outline: none;
        border: none;
        border-radius: 4px;
        background: ${palette.cyan[5]};
        color: white;
        text-align: center;
        font-size: 1rem;
        font-weight: bold;
        margin-right: 0.4rem;
        
        @media (max-width: 550px) {
            font-size: 0.8rem;
        }
    }
    
    input {
        width: 15rem;
        height: 2rem;
        outline: none;
        border: none;
        border-radius: 4px;
        background: ${palette.cyan[0]};
        color: ${palette.gray[6]};
        padding: 0 0.6rem;
        text-align: center;
        font-size: 1rem;
        font-weight: bold;
        
        @media (max-width: 550px) {
            font-size: 0.8rem;
        }
    }
    
    @media (max-width: 490px) {
        margin-bottom: 0.4rem;
    }
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
    .level {
        font-weight: bold;
        color: ${palette.cyan[6]};
    }
    
    @media (max-width: 450px) {
        font-size:
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
                time={time}
                publishedDate={publishedDate}
            />
            <span className={'level'}>
                <Link to={`/?level=${level}`}>난이도: {level}</Link>
            </span>
            <Tags
                tags={tags}
            />
            <p>{body}</p>
        </StyledPostItem>
    )
};

const PostList = ({posts, error, loading, searchTypeInput, searchForInput, onSearchSubmit, onSearchTypeChange, onSearchForChange}) => {
    if (error) {
        return <StyledPostList>에러가 발생했습니다!</StyledPostList>
    }

    return (
        <StyledPostList>
            <FormAndButtonWrapper>
                <StyledSearchForm onSubmit={onSearchSubmit}>
                    <select
                        name="searchType"
                        ref={searchTypeInput}
                        onChange={onSearchTypeChange}
                    >
                        <option value="username">아이디</option>
                        <option value="level">난이도</option>
                        <option value="tag">태그</option>
                    </select>
                    <input
                        type="text"
                        name={"searchFor"}
                        placeholder={"검색할 내용을 입력해주세요!!!"}
                        ref={searchForInput}
                        onChange={onSearchForChange}
                    />
                </StyledSearchForm>
                <Button to={"/game"} cyan>
                    게임 시작!
                </Button>
            </FormAndButtonWrapper>
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

export default React.memo(PostList);
