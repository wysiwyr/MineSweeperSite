import React, {useState, useCallback} from "react";
import styled from "styled-components";
import classNames from "classnames";
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
    width: 450px;
    background: white;
    padding: 1.5rem;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
    text-align: center;
    h2 {
        margin-top: 0;
        margin-bottom: 1rem;
    }
    .tutorial_image {
        margin-bottom: 1rem;
        .disabled {
            display: none;
        }
        div {
            margin-bottom: 0.5rem;
        }
        button + button {
            margin-left: 1rem;
        }
    }
    .tutorial_button {
        display: flex;
        justify-content: flex-end;
        margin: 0;
    }
    
    @media (max-width: 750px) {
        font-size: 0.8rem;
        h2 {
            font-size: 1.2rem;
        }
        width: 300px;
        & img {
            width: 250px;
        }
    }
`;

const TutorialModal = ({visible, onCancel}) => {
    const [step, setStep] = useState(1);
    const onPrevClick = useCallback(() => {
        setStep(step => step -= 1);
    }, []);
    const onNextClick = useCallback(() => {
        setStep(step => step += 1);
    }, []);

    if (!visible ) return null;
    return (
        <Fullscreen>
            <StyledModal>
                <h2>조작 방법</h2>
                <div className={"tutorial_image"}>
                    <div className={classNames(step !== 1 && "disabled")}>
                        <p>좌클릭을 하시면 블록이 열립니다!</p>
                        <img src="images/left_click.gif" alt="좌클릭 이미지"/>
                    </div>
                    <div className={classNames(step !== 2 && "disabled")}>
                        <p>우클릭을 하시면 지뢰 위치를 지정합니다!</p>
                        <img src="images/right_click.gif" alt="우클릭 이미지"/>
                    </div>
                    <div className={classNames(step !== 3 && "disabled")}>
                        <p>
                            휠버튼을 클릭하시면 주위의 블록을 하이라이트합니다!
                        </p>
                        <img src="images/wheel_click_highlight.gif" alt="휠클릭 이미지"/>
                    </div>
                    <div className={classNames(step !== 4 && "disabled")}>
                        <p>
                            휠버튼은 남은 블록을 한번에 열 수 있습니다!
                        </p>
                        <img src="images/wheel_click_open.gif" alt="휠클릭 이미지"/>
                    </div>
                    <div className={classNames(step !== 5 && "disabled")}>
                        <p>
                            블록을 한번에 열 때 지뢰가 있으면 게임이 끝납니다!
                        </p>
                        <img src="images/wheel_click_open_mine.gif" alt="휠클릭 이미지"/>
                    </div>
                    <Button
                        disabled={step === 1}
                        onClick={onPrevClick}
                    >
                        이전
                    </Button>
                    <Button
                        disabled={step === 5}
                        onClick={onNextClick}
                    >
                        다음
                    </Button>
                </div>
                <div className={"tutorial_button"}>
                    <Button onClick={onCancel}>
                        창 닫기
                    </Button>
                </div>
            </StyledModal>
        </Fullscreen>
    )
};

export default React.memo(TutorialModal);