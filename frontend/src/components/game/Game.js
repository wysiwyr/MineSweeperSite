import React from "react";
import './Game.scss'

const Game = ({content}) => {

    return (
        <div id={"game-root"}>
            {content}
        </div>
    )
};

export default React.memo(Game);
