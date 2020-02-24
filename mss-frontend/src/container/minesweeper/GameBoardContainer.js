import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initializeGame, finishGame} from "../../modules/game";
import GameBoard from "../../components/minesweeper/GameBoard";

const GameBoardContainer = () => {
    const dispatch = useDispatch();
    const {
        isStart,
        isFinish,
        ground,
        size,
        mineNum,
        openBlockNum,
    } = useSelector(({game}) => ({
        isStart: game.isStart,
        isFinish: game.isFinish,
        ground: game.ground,
        size: game.size,
        mineNum: game.mineNum,
        openBlockNum: game.openBlockNum,
    }));

    const onRestart = useCallback(() => {
        dispatch(initializeGame());
    }, [dispatch]);

    useEffect(() => {
        if (mineNum === size - openBlockNum && isStart && !isFinish) {
            dispatch(finishGame('Game Clear!!!'));
        }
    }, [dispatch, isStart, isFinish, ground, size, mineNum, openBlockNum]);

    return (
        <GameBoard
            onRestart={onRestart}
        />
    );
};

export default GameBoardContainer;
