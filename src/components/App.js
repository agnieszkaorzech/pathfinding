import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";
import { colors as Colors } from "material-ui/styles";

import findPath from "../services/path-finder";

import ButtonSearchPath from "./Button";
import Card from "./Card";
import TextArea from "./TextArea";
import Grid from "../containers/Grid";

import "./App.css";

injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: Colors.cyan500,
        primary2Color: Colors.cyan700,
        primary3Color: Colors.grey400,
        accent1Color: Colors.pinkA200,
        accent2Color: Colors.grey100,
        accent3Color: Colors.grey500,
        textColor: Colors.darkWhite,
        secondaryTextColor: Colors.lightWhite

    },
    appBar: {
        color: Colors.transparent,
        textColor: Colors.darkWhite,

    },
    listItem: {
        leftIconColor: Colors.lightWhite
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onChangeDimensionWidth = this.onChangeDimensionWidth.bind(this);
        this.onChangeDimensionHeight = this.onChangeDimensionHeight.bind(this);

        const width = 30;
        const height = 20;

        this.state = {
            path: [],
            width,
            height,
        };

        const start = this.getStart();
        const end = this.getEnd();

        props.setStart(start);
        props.setEnd(end);
    }

    getStart(width = this.state.width, height = this.state.height) {
        return {
            x: 0,
            y: Math.round(height / 2),
        };
    }

    getEnd(width = this.state.width, height = this.state.height) {
        return {
            x: width - 1,
            y: Math.round(height / 2),
        };
    }

    generateGradient(angle, ...colors) {
        const STEP = 10;

        let gradients = colors.map((color, index) => {
            return `${color} ${index * STEP}%, ${color} ${(index + 1) * STEP}%`;
        }).join(', ');

        return `repeating-linear-gradient(${angle}, ${gradients})`;
    }

    generateGradientForColorScheme(angle, scheme) {
        let gradientColors = [700, 700, 600, 600, 400, 400, 300].map((color) => Colors[scheme + color]);
        return this.generateGradient(angle, ...gradientColors);
    }

    onClear() {
        this.props.clearObstacles();
    }

    onChangeDimensionWidth(e) {
        const width = parseInt(e.target.value, 10);

        this.setState({ width });

        this.props.setStart(this.getStart(width));
        this.props.setEnd(this.getEnd(width));
    }

    onChangeDimensionHeight(e) {
        const width = this.state.width;
        const height = parseInt(e.target.value, 10);

        this.setState({ height });

        this.props.setStart(this.getStart(width, height));
        this.props.setEnd(this.getEnd(width, height));
    }

    onSearch() {
        const {
            obstacles,
            start,
            end,
        } = this.props;

        const path = findPath({
            grid: {
                width: this.state.width,
                height: this.state.height,
            },
            start,
            end,
            obstacles,
            timeStep: this.state.timeStep,
            maxTime: this.state.maxTime,
        });
        this.setState({path});
    }

    render() {
        let gradientStyle = {
            background: this.generateGradientForColorScheme('135deg', 'blue')
        };
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
                <div className="App" style={gradientStyle}>
                    <div className="app-frame glass">
                        <div className="glass-before" style={gradientStyle}/>
                        <div className="left-panel">
                            <Card/>
                            <ButtonSearchPath onSearch={this.onSearch} label="SEARCH PATH"/>
                            <ButtonSearchPath onSearch={this.onClear} label="CLEAR OBSTACLES"/>
                            <TextArea onChange={this.onChangeDimensionWidth} value={this.state.width}
                                      floatingLabelText="Width Grid"/>
                            <TextArea onChange={this.onChangeDimensionHeight} value={this.state.height}
                                      floatingLabelText="Height Grid"/>
                        </div>
                        <div className="right_panel">
                            <div>
                                <Grid
                                    width={this.state.width}
                                    height={this.state.height}
                                    path={this.state.path}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>

        );
    }
}

export default App;
