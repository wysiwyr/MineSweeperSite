import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {finishGame, openBlock, openNearBlock, setFlag, doChord, highlightOff} from "../../modules/game";
import GameBlock from "../../components/game/GameBlock";

const GameBlockContainer = ({isFinish, space, width}) => {
    const dispatch = useDispatch();

    // 블록을 여는 이벤트
    const onBlockOpen = useCallback(() => {
        if (!(isFinish || space.isOpen)) {
            if (space.val === 'X') {
                dispatch(finishGame('Game Over...'));
            } else if (space.val === 0) {
               dispatch(openBlock(space.id));
               dispatch(openNearBlock(space.id));
            } else {
                dispatch(openBlock(space.id));
            }
        }
    }, [dispatch, isFinish, space]);

    // 지뢰 위치를 설정하거나 주변 블록을 하이라이트할 때 사용
    const onMouseDownAction = useCallback(e => {
        if (!(isFinish || space.isOpen) && e.button === 2) {
            dispatch(setFlag(space.id));
        } else if (!isFinish && space.isOpen && e.button === 1) {
            dispatch(doChord(space.id));
        }
    }, [dispatch, isFinish, space]);

    // 지뢰 위치를 설정하거나 주변 블록을 하이라이트할 때 사용
    const onMouseUpAction = useCallback(e => {
        if (!isFinish && space.isOpen && e.button === 1) {
            dispatch(highlightOff(space.id));
        }
    }, [dispatch, isFinish, space]);

    return (
        <GameBlock
            space={space}
            width={width}
            onBlockOpen={onBlockOpen}
            onMouseDownAction={onMouseDownAction}
            onMouseUpAction={onMouseUpAction}
        />
    );
};

export default React.memo(GameBlockContainer, (prevProps, nextProps) => {
    return (
        prevProps.space.isOpen === nextProps.space.isOpen &&
        prevProps.space.flagSet === nextProps.space.flagSet &&
        prevProps.space.isHighlight === nextProps.space.isHighlight
    )
});