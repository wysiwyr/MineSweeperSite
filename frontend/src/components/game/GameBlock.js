import React from "react";
import classNames from "classnames";
import "./GameBlock.scss"

const GameBlock = ({id, val, isOpen, flagSet, isHighlight, onBlockOpen, onMouseDownAction, onMouseUpAction}) => {
    return (
        <button
            id={id}
            className={classNames('block', isOpen ? 'open-block val-' + val : 'closed-block', isHighlight && 'highlight')}
            onClick={() => onBlockOpen(id)}
            onMouseDown={e => onMouseDownAction(e, id)}
            onMouseUp={e => onMouseUpAction(e, id)}
            onContextMenu={e => e.preventDefault()}
            onAuxClick={e => e.preventDefault()}
            onWheel={e => e.preventDefault()}
        >
            {isOpen ? val > 0 ? val : val === 'X' && <img src="images/mine.png" alt="지뢰"/> : flagSet && '✘'}
        </button>
    )
};

export default React.memo(GameBlock);
