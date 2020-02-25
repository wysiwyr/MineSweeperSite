import React, {useState} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import GameBlockContainer from "../../container/minesweeper/GameBlockContainer";
import AskRestartModal from "./AskRestartModal";
import Button from "../common/Button";
import './GameBoard.scss'

const GameBoard = ({onRestart}) => {
    const [modal, setModal] = useState(false);
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
        setModal(true);
    };

    const onCancel = () => {
        setModal(false);
    };
    const finishText = isClear === 'Game Clear!!!' ? '기록 저장하기' : '다시 시작';

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
                    {finishText}
                </Button>
                <AskRestartModal
                    visible={modal}
                    finishText={finishText}
                    description={isClear === 'Game Clear!!!'
                        ? '기록을 저장하실 건가요?'
                        : '게임을 다시 시작하실 건가요?'}
                    clear={isClear}
                    onConfirm={onRestart}
                    onCancel={onCancel}
                />
            </BoardRestart>}
        </div>
    )
};

export default GameBoard;