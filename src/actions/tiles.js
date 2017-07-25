export const TILES_CLEAR_OBSTACLES = 'TILES_CLEAR_OBSTACLES';
export const TILES_SET_END = 'TILES_SET_END';
export const TILES_SET_START = 'TILES_SET_START';
export const TILES_TOGGLE_OBSTACLE = 'TILES_TOGGLE_OBSTACLE';

export const stateKey = 'tiles';

export const clearObstacles = () => ({
    type: TILES_CLEAR_OBSTACLES,
});

export const setEnd = ({ x, y }) => ({
    type: TILES_SET_END,
    x,
    y,
});

export const setStart = ({ x, y }) => ({
    type: TILES_SET_START,
    x,
    y,
});

export const toggleObstacle = ({ x, y }) => ({
    type: TILES_TOGGLE_OBSTACLE,
    x,
    y,
});
