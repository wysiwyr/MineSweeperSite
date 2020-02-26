import React, {useState} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import GameBlockContainer from "../../container/game/GameBlockContainer";
import AskRestartModal from "./AskRestartModal";
import Button from "../common/Button";
import './GameBoard.scss'

const GameBoard = ({onRestart, onClear}) => {
    const [clearModal, setClearModal] = useState(false);
    const [restartModal, setRestartModal] = useState(false);
    const {
        isFinish,
        isClear,
        ground,
        width,
        mineNum,
    } = useSelector(({game}) => ({
        isFinish: game.isFinish,
        isClear: game.isClear,
        ground: game.ground,
        width: game.width,
        mineNum: game.mineNum,
    }));
    const divWidth = width * 30;
    const Board = styled.div`
            display: inline-block;
            width: ${divWidth}px;
        `;
    const BoardRestart = styled.div`
        width: ${divWidth}px;
    `;
    const onRestartClick = () => {
        setRestartModal(true);
    };

    const onRestartCancel = () => {
        setRestartModal(false);
    };

    const onClearClick = () => {
        setClearModal(true);
    };

    const onClearCancel = () => {
        setClearModal(false);
    };

    return (
        <div id={"board-root"}>
            <div id={"board-minNum-div"}>
                <h2>{isClear ? isClear : '지뢰 갯수 : ' + mineNum + '개'}</h2>
            </div>
            <Board>
                {
                    ground.map(space => {
                        return <GameBlockContainer
                            key={space.id}
                            space={space}
                        />
                    })
                }
            </Board>
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

export default GameBoard;