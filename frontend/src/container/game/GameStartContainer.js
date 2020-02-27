import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setLevel, startGame} from "../../modules/game";
import GameStart from "../../components/game/GameStart";

const GameStartContainer = () => {
    const dispatch = useDispatch();
    const {level} = useSelector(({game}) => ({
        level: game.level,
    }));

    const onStart = useCallback(()  => {
        let mineNum, size, width = 0;
        let ground = [];

        switch (level) {
            case '쉬움':
                mineNum = 10;
                size = 80;
                width = 10;
                break;
            case '보통':
                mineNum = 40;
                size = 252;
                width = 18;
                break;
            case '어려움':
                mineNum = 50;
                size = 480;
                width = 24;
                break;
            default:
        }

        for (let i = 0; i < size; i++) {
            ground.push({id: i, val: 0, isOpen: false, flagSet: false, isHighlight: false,});
        }

        for (let i = 0; i < mineNum; i++) {
            let idx = Math.floor(Math.random() * size);
            let range = [
                -width - 1,
                -width,
                -width + 1,
                -1,
                1,
                width - 1,
                width,
                width + 1
            ];

            if (ground[idx].val === 'X') {
                i--;
                continue;
            }

            ground[idx].val = 'X';

            for (let i = 0; i < 8; i++) {
                let nearBlock = idx + range[i];

                if (nearBlock > -1 && nearBlock < size &&
                    ground[nearBlock].val !== 'X' &&
                    !((idx % width === 0 && nearBlock % width === width - 1) ||
                        (idx % width === width - 1 && nearBlock % width === 0))) {

                    ground[nearBlock].val++;
                }
            }
        }

        dispatch(
            startGame({
                ground,
                size,
                width,
                mineNum,
            })
        );
    }, [dispatch, level]);

    const onSetLevel = useCallback(e=> {
        dispatch(setLevel(e.target.value))
    }, [dispatch]);

    return (
        <GameStart
            onStart={onStart}
            onSetLevel={onSetLevel}
        />
    );
};

export default GameStartContainer;
