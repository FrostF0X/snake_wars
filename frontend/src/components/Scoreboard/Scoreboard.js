import React, { Component } from 'react';
import './Scoreboard.css';

export default class Scoreboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="scoreboard">
                <h2>Legend</h2>

                    <h4 className="scoreboard__player">
                        Player 0
                        <span className="scoreboard__player-id" style={{
                            background: '#E91E63'
                        }}></span><br/>
                        Player 1
                        <span className="scoreboard__player-id" style={{
                            background: '#3F51B5'
                        }}></span><br/>
                        Player 2
                        <span className="scoreboard__player-id" style={{
                            background: '#009688'
                        }}></span>
                    </h4>
            </div>
        );
    }
}
