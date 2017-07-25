/**
 * Created by Agnieszka on 16.07.2017.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors as Colors } from "material-ui/styles";

const colorMap = {
    START: Colors.greenA700,
    TARGET: Colors.redA700,
    OBSTACLE: Colors.indigo800,
    EMPTY: 'transparent',
};

const Container = styled.div`
    width: ${props => props.size - 2}px;
    height: ${props => props.size - 2}px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: ${props => colorMap[props.type]};
`;

class Cell extends Component {
    constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.toggleObstacle = this.toggleObstacle.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    onMouseDown() {
        const { props } = this;

        this.props.mouseDown(props.type);

        if (props.dragType === 'EMPTY' || props.dragType === 'OBSTACLE') {
            this.toggleObstacle();
        }
    }

    onMouseUp() {
        this.props.mouseUp();
    }

    onMouseEnter() {
        const { props } = this;

        switch (props.dragType) {
        case 'EMPTY':
        case 'OBSTACLE':
            return this.toggleObstacle();
        case 'START':
            return props.setStart({
                x: props.x,
                y: props.y,
            });
        case 'TARGET':
            return props.setEnd({
                x: props.x,
                y: props.y,
            });
        default:
        }
    }

    toggleObstacle() {
        const { props } = this;
        props.toggleObstacle({
            x: props.x,
            y: props.y,
        });
    }

    render() {
        return (
            <Container
                size={this.props.size}
                type={this.props.type}
                onMouseDown={this.onMouseDown}
                onMouseEnter={this.onMouseEnter}
                onMouseUp={this.onMouseUp}
                onPath={
                    this.props.onPath &&
                    this.props.type !== 'START' &&
                    this.props.type !== 'TARGET'
                }
            />
        );
    }
}

Cell.defaultProps = {
    type: 'EMPTY',
};

Cell.propTypes = {
    type: PropTypes.oneOf(Object.keys(colorMap)),
    dragType: PropTypes.string,
    mouseUp: PropTypes.func.isRequired,
    mouseDown: PropTypes.func.isRequired,
    onPath: PropTypes.bool,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number,
    disabled: PropTypes.bool,
};

export default Cell;

