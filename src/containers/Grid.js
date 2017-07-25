import { connect } from 'react-redux';

import { stateKey } from '../actions/tiles';

import { getStart, getEnd, getObstacles } from '../selectors/tiles';

import Grid from '../components/Grid';

const mapStateToProps = state => {
    return state => ({
        start: getStart(state[stateKey]),
        end: getEnd(state[stateKey]),
        obstacles: getObstacles(state[stateKey]),
    });
};

export default connect(mapStateToProps)(Grid);
