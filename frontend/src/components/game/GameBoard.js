import React, {useCallback, useState} from "react";
import styled from "styled-components";
import GameBlockContainer from "../../container/game/GameBlockContainer";
import AskRestartModal from "./AskRestartModal";
import TutorialModal from "./TutorialModal";
import Button from "../common/Button";
import "./GameBoard.scss"

const GameBoard = ({isFinish, isClear, ground, width, mineNum, onRestart, onClear}) => {
    const [clearModal, setClearModal] = useState(false);
    const [restartModal, setRestartModal] = useState(false);
    const [tutorialModal, setTutorialModal] = useState(true);
    const divWidth = parseInt(width, 10) * 30;
    const Board = styled.div`
            display: inline-block;
            width: ${divWidth}px;
        `;
    const BoardRestart = styled.div`
        width: ${divWidth}px;
    `;

    const onTutorialClose = useCallback(() => {
        localStorage.setItem('tutorial', 'done'); // localStorage에 tutorial 완료 데이터 추가
        setTutorialModal(false);
    }, []);

    const onRestartClick = useCallback(() => {
        setRestartModal(true);
    }, []);

    const onRestartCancel = useCallback(() => {
        setRestartModal(false);
    }, []);

    const onClearClick = useCallback(() => {
        setClearModal(true);
    }, []);

    const onClearCancel = useCallback(() => {
        setClearModal(false);
    }, []);

    return (
        <div id={"board-root"}>
            <div id={"board-minNum-div"}>
                <h2>{isClear ? isClear : '지뢰 갯수 : ' + mineNum + '개'}</h2>
            </div>
            <Board>
                {ground.map(space => (
                        <GameBlockContainer
                            key={space.id}
                            id={space.id}
                            val={space.val}
                            isOpen={space.isOpen}
                            flagSet={space.flagSet}
                            isHighlight={space.isHighlight}
                        />
                    ))}
            </Board>
            <TutorialModal
                visible={tutorialModal}
                onCancel={onTutorialClose}
            />
            {isFinish
            &&
            <BoardRestart id={"board-restart"}>
                <Button onClick={onRestartClick}>
                    다시 시작
                </Button>
                <AskRestartModal
                    visible={restartModal}
                    finishText={'다시 시작'}
                    description={'게임을 다시 시작하실 건가요?'}
                    onConfirm={onRestart}
                    onCancel={onRestartCancel}
                />
                {isClear === 'Game Clear!!!' && (
                    <>
                        <Button onClick={onClearClick} marginTop={'1rem'}>
                            기록 저장하기
                        </Button>
                        <AskRestartModal
                            visible={clearModal}
                            finishText={'기록 저장'}
                            description={'기록을 저장하실 건가요?'}
                            onConfirm={onClear}
                            onCancel={onClearCancel}
                        />
                    </>
                )}

            </BoardRestart>}
        </div>
    )
};

export default React.memo(GameBoard);