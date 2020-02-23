import React from "react";
import {useSelector} from "react-redux";
import './Game.scss'
import GameStartContainer from "../../container/minesweeper/GameStartContainer";
import GameBoardContainer from "../../container/minesweeper/GameBoardContainer";

const Game = () => {
    const {isStarted} = useSelector(({game}) => ({isStarted: game.isStarted}));
    return (
        <div id={'game-root'}>
            {isStarted ? <GameBoardContainer/> : <GameStartContainer/>}
        </div>
    )
};

export default Game
