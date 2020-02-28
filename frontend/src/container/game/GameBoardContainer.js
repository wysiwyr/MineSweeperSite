import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {initializeGame, increaseOpenBlockNum, finishGame} from "../../modules/game";
import GameBoard from "../../components/game/GameBoard";
import {withRouter} from 'react-router-dom';

const GameBoardContainer = ({history}) => {
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
    }), shallowEqual);

    const onRestart = useCallback(() => {
        dispatch(initializeGame());
    }, [dispatch]);

    const onClear = useCallback(() => {
        history.push('/write');
    }, [history]);

    useEffect(() => {
        const openBlock = ground.filter(space => space.isOpen === true);
        if (openBlock.length !== openBlockNum) {
            dispatch(increaseOpenBlockNum(openBlock.length));
        }
    }, [dispatch, ground, openBlockNum]);

    useEffect(() => {
        if (mineNum === size - openBlockNum && isStart && !isFinish) {
            dispatch(finishGame('Game Clear!!!'));
        }
    }, [dispatch, isStart, isFinish, ground, size, mineNum, openBlockNum]);

    return (
        <GameBoard
            onRestart={onRestart}
            onClear={onClear}
        />
    );
};

export default withRouter(GameBoardContainer);
