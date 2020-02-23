import React from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import GameBlockContainer from "../../container/minesweeper/GameBlockContainer";
import './GameBoard.scss'

const GameBoard = ({onRestart}) => {
    const {
        isFinished,
        ground,
        width,
        mineNum,
    } = useSelector(({game}) => ({
        isFinished: game.isFinished,
        ground: game.ground,
        width: game.width,
        mineNum: game.mineNum,
    }));
    const Board = styled.div`
            display: inline-block;
            width: ${width * 30}px;
        `;

    return (
        <div id={"board-root"}>
            <div id={"board-minNum-div"}>
                <h2>지뢰 갯수 : {mineNum}개</h2>
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
            {isFinished
            &&
            <div id={"restart"}>
                <button onClick={onRestart}>
                    다시시작
                </button>
            </div>}
        </div>
    )
};

export default GameBoard;