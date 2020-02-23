import React from 'react';
import Responsive from "../components/common/Responsive";
import Game from "../components/minesweeper/Game";

const GamePage = () => {
    return (
        <Responsive>
            <Game/>
        </Responsive>
    );
};

export default GamePage;