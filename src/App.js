import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

// 3rd-Party Dependencies
var generateName = require('sillyname'); // Silly name generator

// Movie List Import
const movieData = require('./movies.json');
const movies = movieData.movies.slice();
const moviesComplete = movieData.movies.slice();

// FUNCTIONS
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class TeamChooser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teams: []
        }
    }

    newTeam() {
        const teamName = generateName() + 's'; // Doesn't normally pluralise
        console.log(teamName)
    }

    render() {
        return(
            <div>
                <h2>Choose Teams</h2>
                <button onClick={() => this.newTeam()}>New Team</button>
            </div>
        )
    }
}

class CharadeTitle extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
            </div>
        );
    }
};

class NextCharadeButton extends Component {
    render() {
        return (
            <button onClick={() => this.props.onClick()}>
                New Charade
            </button>
        )
    }
}

class Timer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elapsed: 0
        }

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 50);
    }

    tick() {
        this.setState({
            elapsed: new Date() - this.props.start
        });
    }

    render() {
        var elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        var seconds = (elapsed / 10).toFixed(0);
        seconds = seconds - 5;

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.

        let color = "#111";

        if (seconds < 0) {
            color = "#44BA84";
        } else if (seconds >= 60) {
            color = "#E22218";
        } else if (seconds >= 50) {
            color = "#F38F3D";
        }

        const timerStyle = {
            color: color
        };

        return (
            <p>Time elapsed:
                <span style={timerStyle}>{seconds}</span>
            </p>
        );
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSetUp: false,
            teams: [],
            timerLength: 60,
            scores: [],
            currentCharade: 'Press the button!',
            history: []
        }
    }

    nextCharade() {
        const index = getRandomInt(0, movies.length - 1);
        console.log('index = ' + index);
        const history = this.state.history.slice();

        history.push(index);

        this.setState({
            history: history,
            currentCharade: movies[index]
        }, this.cleanList);
    }

    cleanList() {
        // Get last history result (latest)
        const length = this.state.history.length;
        const latestIndex = this.state.history[(length - 1)];
        console.log('removed index ' + latestIndex);
        movies.splice(latestIndex, 1);
    }

    render() {
        return (
            <div style={{
                margin: '10%'
            }}>
                <CharadeTitle title={this.state.currentCharade}/>
                <NextCharadeButton onClick={() => this.nextCharade()}/>
                <Timer start={Date.now()}/>
                <div>
                    <TeamChooser />
                </div>
            </div>

        );
    }
}

export default App;
