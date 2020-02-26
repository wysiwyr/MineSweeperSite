import React from "react";
import classNames from 'classnames';
import './GameBlock.scss'

const GameBlock = ({space, onBlockOpen, onSetFlag}) => {
    return (
        <button
            id={space.id}
            className={classNames('block', space.isOpen ? 'open-block val-' + space.val : 'closed-block')}
            onClick={onBlockOpen}
            onMouseDown={e => onSetFlag(e, space.id)}
            onContextMenu={e => e.preventDefault()}
        >
            {space.isOpen ? space.val > 0 ? space.val : space.val === 'X' && <img src="images/mine.png" alt="지뢰"/> : space.flagSet && '✘' }
        </button>
    )
};

export default GameBlock;
