import { connect } from 'react-redux';

import {
    clearObstacles,
    setEnd,
    setStart,
    stateKey,
} from '../actions/tiles';

import { getStart, getEnd, getObstacles } from '../selectors/tiles';

import App from '../components/App';

const mapStateToProps = state => {
    return state => ({
        start: getStart(state[stateKey]),
        end: getEnd(state[stateKey]),
        obstacles: getObstacles(state[stateKey]),
    });
};

const mapDispatchToProps = {
    clearObstacles,
    setEnd,
    setStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
