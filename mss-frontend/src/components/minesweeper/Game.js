import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initializeGame} from "../../modules/game";
import GameStartContainer from "../../container/minesweeper/GameStartContainer";
import GameBoardContainer from "../../container/minesweeper/GameBoardContainer";
import './Game.scss'

const Game = () => {
    const dispatch = useDispatch();
    const {isStart} = useSelector(({game}) => ({isStart: game.isStart}));

    useEffect(() => {
        dispatch(initializeGame())
    }, [dispatch]);

    return (
        <div id={"game-root"}>
            {isStart ? <GameBoardContainer/> : <GameStartContainer/>}
        </div>
    )
};

export default Game
