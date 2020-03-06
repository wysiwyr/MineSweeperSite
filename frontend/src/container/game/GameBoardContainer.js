import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {withRouter} from "react-router-dom";
import {initializeGame, increaseOpenBlockNum, finishGame} from "../../modules/game";
import GameBoard from "../../components/game/GameBoard";

const GameBoardContainer = ({history}) => {
    const dispatch = useDispatch();
    const {
        isStart,
        isClear,
        isFinish,
        ground,
        size,
        width,
        mineNum,
        openBlockNum,
    } = useSelector(({game}) => ({
        isStart: game.isStart,
        isClear: game.isClear,
        isFinish: game.isFinish,
        ground: game.ground,
        size: game.size,
        width: game.width,
        mineNum: game.mineNum,
        openBlockNum: game.openBlockNum,
    }), shallowEqual);

    // 재시작 버튼을 누르면 게임 초기화
    const onRestart = useCallback(() => {
        dispatch(initializeGame());
    }, [dispatch]);

    // 게임을 클리어했을 때 기록 저장 페이지로 이동
    const onClear = useCallback(() => {
        history.push('/write');
    }, [history]);

    // 열린 블록의 수가 증가하면 액션 실행
    useEffect(() => {
        const openBlock = ground.filter(space => space.isOpen === true);
        if (openBlock.length !== openBlockNum) {
            dispatch(increaseOpenBlockNum(openBlock.length));
        }
    }, [dispatch, ground, openBlockNum]);

    // 게임 클리어 조건을 달성하면 액션 실행
    useEffect(() => {
        if (mineNum === size - openBlockNum && isStart && !isFinish) {
            dispatch(finishGame('Game Clear!!!'));
        }
    }, [dispatch, isStart, isFinish, size, mineNum, openBlockNum]);

    return (
        <GameBoard
            isFinish={isFinish}
            isClear={isClear}
            ground={ground}
            width={width}
            mineNum={mineNum}
            openBlockNum={openBlockNum}
            onRestart={onRestart}
            onClear={onClear}
        />
    );
};

export default withRouter(GameBoardContainer);
