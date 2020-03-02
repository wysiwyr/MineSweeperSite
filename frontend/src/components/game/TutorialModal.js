import React from "react";
import styled from "styled-components";
import Button from "../common/Button";

const Fullscreen = styled.div`
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledModal = styled.div`
    width: 320px;
    background: white;
    padding: 1.5rem;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
    h2 {
        margin-top: 0;
        margin-bottom: 1rem;
    }
    div {
        margin-bottom: 3rem;
        img {
            
        }
    }
    .button {
        display: flex;
        justify-content: flex-end;
        margin: 0;
    }
`;

const StyledButton = styled(Button)`
    height: 2rem;
`;

const TutorialModal = (
    {
        visible,
        onCancel,
    }
) => {
    if (!visible) return null;
    return (
        <Fullscreen>
            <StyledModal>
                <h2>조작 방법</h2>
                <div>
                    <img src="images/left_click.png" alt="좌클릭 이미지"/>
                    <img src="images/right_click.png" alt="우클릭 이미지"/>
                    <img src="images/wheel_click.png" alt="휠클릭 이미지"/>
                </div>
                <div className={"button"}>
                    <StyledButton onClick={onCancel}>
                        창 닫기
                    </StyledButton>
                </div>
            </StyledModal>
        </Fullscreen>
    )
};

export default TutorialModal;