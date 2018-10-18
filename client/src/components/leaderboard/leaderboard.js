import React, { Component } from 'react';
import Results from '../results/results';
import {withTheme} from "@material-ui/core/styles/index";

class Leaderboard extends Component {

  render() {
    return (
      <div style={{color: this.props.theme.palette.primary.main }}>
        <h1>Leaderboard</h1>
        <Results cardModifier="card-leaderboard" apiUrl="/results/leaders" refreshRate={20000}/>
      </div>
    );
  }
}

export default withTheme()(Leaderboard);
