import React, {useCallback} from "react";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {finishGame, openBlock, openNearBlock, setFlag, doChord, highlightOff} from "../../modules/game";
import GameBlock from "../../components/game/GameBlock";

const GameBlockContainer = ({id, val, isOpen, flagSet, isHighlight}) => {
    const dispatch = useDispatch();
    const {
        isFinish,
    } = useSelector(({game}) => ({
        isFinish: game.isFinish,
    }), shallowEqual);

    // 블록을 여는 이벤트
    const onBlockOpen = useCallback(() => {
        if (!(isFinish || isOpen)) {
            if (val === 'X') {
                dispatch(finishGame('Game Over...'));
            } else if (val === 0) {
               dispatch(openBlock(id));
               dispatch(openNearBlock(id));
            } else {
                dispatch(openBlock(id));
            }
        }
    }, [dispatch, isFinish, id, val, isOpen]);

    // 지뢰 위치를 설정하거나 주변 블록을 하이라이트할 때 사용
    const onMouseDownAction = useCallback(e => {
        if (!(isFinish || isOpen) && e.button === 2) {
            dispatch(setFlag(id));
        } else if (!isFinish && isOpen && e.button === 1) {
            dispatch(doChord(id));
        }
    }, [dispatch, isFinish, id, isOpen]);

    // 지뢰 위치를 설정하거나 주변 블록을 하이라이트할 때 사용
    const onMouseUpAction = useCallback(e => {
        if (!isFinish && isOpen && e.button === 1) {
            dispatch(highlightOff(id));
        }
    }, [dispatch, isFinish, id, isOpen]);

    return (
        <GameBlock
            id={id}
            val={val}
            isOpen={isOpen}
            flagSet={flagSet}
            isHighlight={isHighlight}
            onBlockOpen={onBlockOpen}
            onMouseDownAction={onMouseDownAction}
            onMouseUpAction={onMouseUpAction}
        />
    );
};

export default React.memo(GameBlockContainer);