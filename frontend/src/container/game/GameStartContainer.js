import React, {useRef, useCallback} from "react";
import {useDispatch} from "react-redux";
import {setLevel, startGame} from "../../modules/game";
import GameStart from "../../components/game/GameStart";

const GameStartContainer = () => {
    const levelSelect = useRef('쉬움');
    const dispatch = useDispatch();

    // 시작 버튼을 누르면 게임 데이터 생성
    const onStart = useCallback(()  => {
        let mineNum, size, width = 0;
        let ground = [];

        switch (levelSelect.current) {
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
                mineNum = 90;
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
    }, [dispatch]);

    // 난이도 변경시 스토어에 저장
    const onSetLevel = useCallback(e=> {
        levelSelect.current = e.target.value;
        dispatch(setLevel(e.target.value))
    }, [dispatch]);

    return (
        <GameStart
            onStart={onStart}
            onSetLevel={onSetLevel}
        />
    );
};

export default React.memo(GameStartContainer);
