import React, {Component} from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ButtonSearchPath from "../components/Button/Button";
import findPath from "../services/path-finder";
import Grid from "../lib/components/grid";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.onGridUpdate = this.onGridUpdate.bind(this);
        const width = 40;
        const height = 30;
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
        return (
            <div className="App">
                <MuiThemeProvider>
                    <ButtonSearchPath onSearch={this.onSearch}/>
                </MuiThemeProvider>
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
        );
    }
}

export default App;
