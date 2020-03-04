export default function (id, ground, size, width, nearBlock) {
    let storeNearBlock = nearBlock.slice();
    let nearCloseBlock = [];
    let localNearBlock = 0;
    let ids = [];
    while (storeNearBlock.length > 0) {
        localNearBlock = id + storeNearBlock.pop();

        if (
            localNearBlock > -1 && localNearBlock < size &&
            !ground[localNearBlock].isOpen && !ground[localNearBlock].flagSet &&
            !((id % width === 0 && localNearBlock % width === width - 1) ||
                (id % width === width - 1 && localNearBlock % width === 0))
        ) {
            nearCloseBlock.push(localNearBlock);
        }
    }

    while (nearCloseBlock.length > 0) {
        const space = nearCloseBlock.pop();
        ids.push(space);
    }
    return ids;
}