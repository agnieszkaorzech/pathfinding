import { connect } from 'react-redux';

import {
    toggleObstacle,
    setEnd,
    setStart,
} from '../../actions/tiles';

import Cell from '../../components/Grid/Cell';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    toggleObstacle,
    setStart,
    setEnd,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
