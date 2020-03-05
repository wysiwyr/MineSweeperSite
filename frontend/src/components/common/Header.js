import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Responsive from "./Responsive";
import Button from "./Button";

const StyledHeader = styled.div`
    position: fixed;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

// Responsive 컴포넌트에 스타일을 추가해서 새로운 컴포넌트 생성
const Wrapper = styled(Responsive)`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
        @media (max-width: 550px) {
            font-size: 1rem;
        }
    }
    .right {
        display: flex;
        align-items: center;
        a {
            margin-right: 0.5rem
        }
    }
`;

// Header가 fixed이기 때문에 콘텐츠를 4rem 아래에 나타나도록 해 주는 컴포넌트
const Spacer = styled.div`
    height: 4rem;
`;

const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;
    @media (max-width: 550px) {
        font-size: 0.8rem;
    }
`;

const Header = ({user, onLogout}) => {
    return (
        <>
            <StyledHeader>
                <Wrapper>
                    <Link to={"/"} className={"logo"}>
                        MineSweeper
                    </Link>
                    {user ? (
                        <div className={"right"}>
                            <UserInfo>{user.username}</UserInfo>
                            <Button onClick={onLogout}>로그아웃</Button>
                        </div>
                    ) : (
                        <div className={"right"}>
                            <Button to={"/login"}>로그인</Button>
                            <Button to={"/register"}>회원가입</Button>
                        </div>
                    )}
                </Wrapper>
            </StyledHeader>
            <Spacer/>
        </>
    )
};

export default React.memo(Header);