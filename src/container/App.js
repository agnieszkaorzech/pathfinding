import React, {Component} from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {colors as Colors} from "material-ui/styles";
import ButtonSearchPath from "../components/Button/Button";
import findPath from "../services/path-finder";
import Grid from "../lib/components/Grid";
import injectTapEventPlugin from "react-tap-event-plugin";
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
        this.onGridUpdate = this.onGridUpdate.bind(this);
        const width = 30;
        const height = 20;
        this.state = {
            path: [],
            obstacles: [],
            start: {
                x: 0,
                y: Math.round(height / 2),
            },
            end: {
                x: width - 1,
                y: Math.round(height / 2),
            },
            width,
            height,
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

    onGridUpdate({obstacles, start, end}) {
        this.setState({obstacles, start, end});
    }

    onSearch() {
        const path = findPath({
            grid: {
                width: this.state.width,
                height: this.state.height,
            },
            start: this.state.start,
            end: this.state.end,
            obstacles: this.state.obstacles,
            timeStep: this.state.timeStep,
            maxTime: this.state.maxTime,
        });
        this.setState({path});
    }

    render() {
        let gradientStyle = {
            background: this.generateGradientForColorScheme('135deg', 'cyan')
        };
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
                <div className="App" style={gradientStyle}>
                    <div className="app-frame glass">
                        <div className="glass-before" style={gradientStyle}/>
                        <div className="left-panel">
                            <ButtonSearchPath onSearch={this.onSearch}/>
                        </div>
                        <div className="right_panel">
                            <div>
                                <Grid
                                    obstacles={this.state.obstacles}
                                    start={this.state.start}
                                    end={this.state.end}
                                    width={this.state.width}
                                    height={this.state.height}
                                    path={this.state.path}
                                    onGridUpdate={this.onGridUpdate}
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
