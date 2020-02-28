import React from "react";
import Button from "../common/Button";
import './GameStart.scss'

const GameStart = ({onStart, onSetLevel}) => {

    return (
        <div id={"start-root"}>
            <div id={"start-select-div"}>
                <label>
                    <h3>게임 난이도</h3>
                </label>
                <select
                    name={"level"}
                    id={"level"}
                    onChange={onSetLevel}
                >
                    <option value={"쉬움"}>쉬움</option>
                    <option value={"보통"}>보통</option>
                    <option value={"어려움"}>어려움</option>
                </select>
            </div>
            <div id={"start-btn-div"}>
                <Button onClick={onStart}>시작</Button>
            </div>
        </div>
    );
};

export default React.memo(GameStart);
