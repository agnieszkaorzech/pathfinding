import {
    TILES_CLEAR_OBSTACLES,
    TILES_SET_END,
    TILES_SET_START,
    TILES_TOGGLE_OBSTACLE,
} from '../actions/tiles';

import { findAll, findOne } from '../selectors/tiles';

// Create an array of arrays, 30x20. We can access a given cell by calling cell[x][y].
const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
    case TILES_CLEAR_OBSTACLES: {
        const nextState = [...state];

        const obstacles = findAll(nextState, 'obstacle');
        obstacles.forEach(({ x, y }) => nextState[x][y] = null);

        return nextState;
    }
    case TILES_SET_START: {
        const nextState = [...state];

        // Clear old start tile
        const oldStart = findOne(nextState, 'start');
        if (oldStart) {
            nextState[oldStart.x][oldStart.y] = null;
        }

        const { x, y } = action;

        // Create row if it doesn't exist yet
        if (!nextState[x]) {
            nextState[x] = [];
        }

        // Create tile if it doesn't exist yet
        if (!nextState[x][y]) {
            nextState[x][y] = {};
        }

        nextState[x][y].type = 'start';

        return nextState;
    }
    case TILES_SET_END: {
        const nextState = [...state];

        // Clear old end tile
        const oldEnd = findOne(nextState, 'end');
        if (oldEnd) {
            nextState[oldEnd.x][oldEnd.y] = null;
        }

        const { x, y } = action;

        // Create row if it doesn't exist yet
        if (!nextState[x]) {
            nextState[x] = [];
        }

        // Create tile if it doesn't exist yet
        if (!nextState[x][y]) {
            nextState[x][y] = {};
        }

        nextState[x][y].type = 'end';

        return nextState;
    }
    case TILES_TOGGLE_OBSTACLE: {
        const nextState = [...state];

        const { x, y } = action;

        // Create row if it doesn't exist yet
        if (!nextState[x]) {
            nextState[x] = [];
        }

        // Create tile if it doesn't exist yet
        if (!nextState[x][y]) {
            nextState[x][y] = {};
        }

        if (nextState[x][y].type === 'obstacle') {
            nextState[x][y].type = 'empty';
        } else {
            nextState[x][y].type = 'obstacle';
        }

        return nextState;
    }
    default:
        return state;
    }
}
