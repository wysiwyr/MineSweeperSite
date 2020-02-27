import React from "react";
import classNames from 'classnames';
import './GameBlock.scss'

const GameBlock = ({space, onBlockOpen, onMouseDownAction, onMouseUpAction}) => {
    return (
        <button
            id={space.id}
            className={classNames('block', space.isOpen ? 'open-block val-' + space.val : 'closed-block', space.isHighlight && 'highlight')}
            onClick={() => onBlockOpen(space.id)}
            onMouseDown={e => onMouseDownAction(e, space.id)}
            onMouseUp={e => onMouseUpAction(e, space.id)}
            onContextMenu={e => e.preventDefault()}
            onAuxClick={e => e.preventDefault()}
            onWheel={e => e.preventDefault()}
        >
            {space.isOpen ? space.val > 0 ? space.val : space.val === 'X' && <img src="images/mine.png" alt="지뢰"/> : space.flagSet && '✘' }
        </button>
    )
};

export default GameBlock;
