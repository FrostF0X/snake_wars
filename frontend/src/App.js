import React, { Component } from 'react';
import logo from './images/head.svg';
import './App.css';

import Board from './components/Board/Board';
import Scoreboard from './components/Scoreboard/Scoreboard'
import { socketConnect } from 'socket.io-react';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      "board": [
        [
          undefined, // empty,
          "🍎", // apple
          {
            "dead": true,
          },
          {
            "player": 2,
          },
          {
            "player": 1,
          },
          {
            "player": 3,
            "head": ['N', 'E', 'S', 'W'][0],
          }
        ],
        [
          undefined, // empty,
          "🍎", // apple
          {
            "dead": true,
          },
          {
            "player": 1,
          },
          {
            "player": 2,
          },
          {
            "player": 3,
            "head": ['N', 'E', 'S', 'W'][0],
          }
        ],
        [
          undefined, // empty,
          "🍎", // apple
          {
            "dead": true,
          },
          {
            "player": 1,
          },
          {
            "player": 2,
          },
          {
            "player": 3,
            "head": ['N', 'E', 'S', 'W'][0],
          }
        ],
        [
          undefined, // empty,
          "🍎", // apple
          {
            "dead": true,
          },
          {
            "player": 2,
          },
          {
            "player": 1,
          },
          {
            "player": 3,
            "head": ['N', 'E', 'S', 'W'][0],
          }
        ]
      ]
    };
  }

  componentDidMount() {
    this.props.socket.on('update', this.update);
  }

  update = (data) => {
    this.setState({
      board: data
    });
  };
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo-container">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <h1 className="App-title shadow">Welcome to the Crazy Snake Game!</h1>
        </header>
          <Board boardData={this.state.board} />
          <Scoreboard />
      </div>
    );
  }
}

export default socketConnect(App);
