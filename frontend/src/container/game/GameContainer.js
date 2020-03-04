import React, {useEffect} from "react";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {initializeGame} from "../../modules/game";
import {withRouter} from "react-router-dom";
import Game from "../../components/game/Game";
import GameStartContainer from "../../container/game/GameStartContainer";
import GameBoardContainer from "../../container/game/GameBoardContainer";

const GameContainer = ({history}) => {
    const dispatch = useDispatch();
    const {isStart, user} = useSelector(({game, user}) => ({
        isStart: game.isStart,
        user: user.user,
    }), shallowEqual);

    // 로그인한 유저인지 확인
    useEffect(() => {
        if (user === null) {
            alert('올바른 접근이 아닙니다!!!');
            history.push('/');
        }
        dispatch(initializeGame());
        return() => {
            dispatch(initializeGame());
        }
    }, [dispatch, user, history]);

    return (
        <Game
            content={isStart ? <GameBoardContainer/> : <GameStartContainer/>}
        />
    )
};

export default withRouter(GameContainer);
