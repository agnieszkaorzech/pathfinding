export const findAll = (tiles, type) => {
    const result = [];
    for (let x = 0; x < tiles.length; x++) {
        const column = tiles[x];
        if (column) {
            for (let y = 0; y < column.length; y++) {
                const tile = tiles[x][y];
                if (tile && tile.type === type) {
                    result.push({ x, y });
                }
            }
        }
    }
    return result;
}

export const findOne = (tiles, type) => {
    for (let x = 0; x < tiles.length; x++) {
        const column = tiles[x];
        if (column) {
            for (let y = 0; y < column.length; y++) {
                const tile = tiles[x][y];
                if (tile && tile.type === type) {
                    return { x, y };
                }
            }
        }
    }
}

export const getStart = tiles => {
    return findOne(tiles, 'start');
}

export const getEnd = tiles => {
    return findOne(tiles, 'end');
}

export const getObstacles = tiles => {
    return findAll(tiles, 'obstacle');
}
