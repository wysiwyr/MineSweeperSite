import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initialize, finishGame} from "../../modules/game";
import GameBoard from "../../components/minesweeper/GameBoard";

const GameBoardContainer = () => {
    const dispatch = useDispatch();
    const {
        isStarted,
        isFinished,
        ground,
        size,
        mineNum,
        openBlockNum,
    } = useSelector(({game}) => ({
        isStarted: game.isStarted,
        isFinished: game.isFinished,
        ground: game.ground,
        size: game.size,
        mineNum: game.mineNum,
        openBlockNum: game.openBlockNum,
    }));

    const onRestart = useCallback(() => {
        dispatch(initialize());
    }, [dispatch]);

    useEffect(() => {
        if (mineNum === size - openBlockNum && isStarted && !isFinished) {
            dispatch(finishGame());
        }
    }, [dispatch, isStarted, isFinished, ground, size, mineNum, openBlockNum]);

    return (
        <GameBoard
            onRestart={onRestart}
        />
    );
};

export default GameBoardContainer;
