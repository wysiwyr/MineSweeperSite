export default function (id, ground, size, width, nearBlock) {
    let returnVal = {
        ids: [],
        type: '',
    };
    let storeNearBlock = nearBlock.slice();
    let nearFlag = 0;
    let localNearBlock = 0;
    while (storeNearBlock.length > 0) {
        localNearBlock = id + storeNearBlock.pop();
        if (
            localNearBlock > -1 && localNearBlock < size &&
            !ground[localNearBlock].isOpen &&
            !((id % width === 0 && localNearBlock % width === width - 1) ||
                (id % width === width - 1 && localNearBlock % width === 0))
        ) {
            if (ground[localNearBlock].flagSet) {
                nearFlag++;
            } else {
                returnVal.ids.push(localNearBlock);
            }
        }
    }

    if (nearFlag === parseInt(ground[id].val, 10)) {
        returnVal.type = 'OpenBlock';
    } else {
        returnVal.type = 'HighlightOn';
    }

    return returnVal;
}