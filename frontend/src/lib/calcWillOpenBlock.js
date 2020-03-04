export default function (id, ground, size, width, nearBlock) {
    const storeNearBlock = nearBlock.slice();
    let ids = [];
    let visited = new Array(size).fill(false);
    let queue = [id];
    let zeroBlock = [id];

    visited[id] = true;

    while (queue.length > 0) {
        let idx = queue.shift();

        for (let i = 0; i < 4; i++) {
            let localNearBlock = idx + storeNearBlock[i];

            if (localNearBlock > -1 && localNearBlock < size && !ground[localNearBlock].isOpen &&
                ground[localNearBlock].val === 0 && !visited[localNearBlock] &&
                !((idx % width === 0 && localNearBlock % width === width - 1) ||
                    (idx % width === width - 1 && localNearBlock % width === 0))) {
                queue.push(localNearBlock);
                zeroBlock.push(localNearBlock);
                visited[localNearBlock] = true;
                ids.push(localNearBlock);
            }
        }
    }

    visited = new Array(size).fill(false);

    while (zeroBlock.length > 0) {
        let idx = zeroBlock.shift();

        for (let i = 0; i < 8; i++) {
            let localNearBlock = idx + storeNearBlock[i];

            if (localNearBlock > -1 && localNearBlock < size &&
                !visited[localNearBlock] &&
                ground[localNearBlock].val > 0 &&
                !ground[localNearBlock].isOpen &&
                !((idx % width === 0 && localNearBlock % width === width - 1) ||
                    (idx % width === width - 1 && localNearBlock % width === 0))) {
                visited[localNearBlock] = true;
                ids.push(localNearBlock);
            }
        }
    }

    return ids;
}