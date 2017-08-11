/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.currentPlayerId = 1;
    this.state = {
      players: [],
    };
  }
  createPlayer = ({ currentPlayerId } = this) => {
    const player = {
      id: currentPlayerId,
      name: `player${currentPlayerId}`,
      speed: 1,
      strength: 2,
      agility: currentPlayerId,
    };
    this.currentPlayerId++;
    return player;
  };
  generateTeam = () => {
    const players = [];
    for (let i = 0; i < 15; i++) {
      players.push(this.createPlayer());
    }
    players.reverse();
    this.setState({
      players,
    });
  };
  getTotalAttributeScore = players => {
    let attributeScore = 0;
    players.forEach(player => {
      attributeScore += this.getAttributeScore(player);
    });
    return attributeScore;
  }
  getAttributeScore = ({speed, strength, agility}) => {
    return speed + strength + agility;
  }

  render({ state: { players } } = this) {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {players.length === 0 &&
            <button className={s.generate} onClick={this.generateTeam}>
              Generate team
            </button>}
          <div className={s.players}>
            {players.map((player, i) =>
              <div className={s.player}>
                <p>
                  <span className={s.playerLabel}>Name</span> {player.name}
                </p>
                <p>
                  <span className={s.playerLabel}>Speed: </span> {player.speed}
                </p>
                <p>
                  <span className={s.playerLabel}>Strength: </span>{' '}
                  {player.strength}
                </p>
                <p>
                  <span className={s.playerLabel}>Agility: </span>{' '}
                  {player.agility}
                </p>
                <p>
                  <span className={s.playerLabel}>Score: </span>{' '}
                  {this.getAttributeScore(player)}
                </p>
                <p>
                  <span className={s.playerLabel}>Starter: </span>{' '}
                  {i < 10 ? 'Yes' : 'No'}
                </p>
              </div>,
            )}
          </div>
          {players &&
            <p>
              Total attribute score: {this.getTotalAttributeScore(players)}
            </p>}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
