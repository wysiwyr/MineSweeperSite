import React from 'react';
import HeaderContainer from "../container/common/HeaderContainer";
import Game from "../components/minesweeper/Game";

const GamePage = () => {
    return (
        <>
            <HeaderContainer/>
            <Game/>
        </>
    );
};

export default GamePage;