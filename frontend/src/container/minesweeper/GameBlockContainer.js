import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {finishGame, openBlock, setFlag} from "../../modules/game";
import GameBlock from "../../components/minesweeper/GameBlock";

const GameBlockContainer = ({space}) => {
    const dispatch = useDispatch();
    const {
        isFinish,
        ground,
        size,
        width,
    } = useSelector(({game}) => ({
        isFinish: game.isFinish,
        ground: game.ground,
        size: game.size,
        width: game.width,
    }));

    const onBlockOpen = useCallback(e => {

        let range = [-width, -1, 1, width, -width - 1, -width + 1, width - 1, width + 1];
        let id = parseInt(e.target.id);

        if (!(isFinish || ground[id].isOpen)) {
            if (ground[id].val === 'X') {
                dispatch(finishGame('Game Over...'));
            } else if (ground[id].val === 0) {
                let visited = new Array(size).fill(false);
                let queue = [id];
                let zeroBlock = [id];

                visited[id] = true;
                dispatch(openBlock(id));

                while (queue.length > 0) {
                    let idx = queue.shift();

                    for (let i = 0; i < 4; i++) {
                        let nearBlock = idx + range[i];

                        if (nearBlock > -1 && nearBlock < size &&
                            ground[nearBlock].val === 0 && !visited[nearBlock] &&
                            !((idx % width === 0 && nearBlock % width === width - 1) ||
                                (idx % width === width - 1 && nearBlock % width === 0))) {
                            queue.push(nearBlock);
                            zeroBlock.push(nearBlock);
                            visited[nearBlock] = true;
                            dispatch(openBlock(nearBlock));
                        }
                    }
                }

                visited = new Array(size).fill(false);

                while (zeroBlock.length > 0) {
                    let idx = zeroBlock.shift();

                    for (let i = 0; i < 8; i++) {
                        let nearBlock = idx + range[i];

                        if (nearBlock > -1 && nearBlock < size &&
                            !visited[nearBlock] &&
                            ground[nearBlock].val > 0 &&
                            !ground[nearBlock].isOpen &&
                            !((idx % width === 0 && nearBlock % width === width - 1) ||
                                (idx % width === width - 1 && nearBlock % width === 0))) {
                            visited[nearBlock] = true;
                            dispatch(openBlock(nearBlock));
                        }
                    }
                }
            } else {
                dispatch(openBlock(id));
            }
        }
    }, [dispatch, isFinish, ground, size, width]);

    const onSetFlag = useCallback((e, id)  => {
        if (!(isFinish || ground[id].isOpen) && e.button === 2) {
            dispatch(setFlag(id));
        }
    }, [dispatch, isFinish, ground]);

    return (
        <GameBlock
            space={space}
            onBlockOpen={onBlockOpen}
            onSetFlag={onSetFlag}
        />
    );
};

export default React.memo(GameBlockContainer);