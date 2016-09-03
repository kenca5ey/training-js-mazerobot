import React from 'react';
import ReactDOM from 'react-dom';
import ReactInterval from 'react-interval';
import Grid from './components/Grid';
import Robot from './components/Robot';
import Missile from './components/Missile';
import Explosion from './components/Explosion';
import Console from './components/Console';
import Controller from './Controller';
import MissileController from './MissileController';
import {matrix} from './Config';

require('./style.less');

let App = React.createClass({

    getInitialState() {
        return {
            playback: {
                enabled: false,
                timeout: 1000,
                callback: this._moveObjects
            },
            robot: {
                position: {
                    x: 0,
                    y: 0
                },
                direction: 'east',
                log: 'Just started',
                missileFired: false
            },
            missile: {
                position: {
                    x: 0,
                    y: 0
                },
                transition: 'off'
            },
            explosion: {
                position: {
                    x: 3,
                    y: 3
                },
                state: ''
            },
            logs: []
        };
    },

    _toggleEnabled: function () {
        this.setState({
            playback: {
                enabled: !this.state.playback.enabled,
                timeout: this.state.playback.timeout,
                callback: this._moveObjects
            }
        });
    },

    _moveObjects: function () {
        this._moveRobot();
        this._moveMissile();
        this._showExplosion();
    },

    _moveRobot: function () {
        let command = Controller(this.state.robot);
        this.setState({
            robot: command
        });
    },

    _moveMissile: function () {
        let command = MissileController(this.state.missile, this.state.robot);
        this.setState({
            missile: command
        });
    },

    _showExplosion: function () {
        if (this.state.missile.explosionPosition) {
            this.setState({
                explosion: {
                    position: {
                        x: this.state.missile.explosionPosition.x,
                        y: this.state.missile.explosionPosition.y
                    },
                    state: 'exploding'
                }
            });
            matrix[this.state.missile.explosionPosition.y][this.state.missile.explosionPosition.x] = 0;
        } else {
            this.setState({
                explosion: {
                    state: ''
                }
            });
        }
    },

    render: function () {
        return (
            <div id="root">
                <div id="battlefield">
                    <div>
                        <div id="field">
                            <Grid map={matrix}/>
                            <Robot {...this.state.robot} />
                            <Missile {...this.state.missile} />
                            <Explosion {...this.state.explosion} />
                        </div>
                    </div>
                </div>
                <div id="sidebar">
                    <div className="topbar">
                        <button onClick={this._toggleEnabled}
                                className={this.state.playback.enabled ? 'btn btn-danger' : 'btn btn-success'}>{this.state.playback.enabled ? 'Stop' : 'Start'}</button>
                    </div>
                    <div className="logs">
                        <Console logs={this.state.logs}/>
                    </div>
                </div>
                <ReactInterval {...this.state.playback} />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
