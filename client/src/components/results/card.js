import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './results.css';
import {withTheme} from "@material-ui/core/styles/index";

class Card extends Component {
  formatTime(time) {
    let formattedTime = this.formatDigits(time.getUTCMinutes(), 2) + ":" + this.formatDigits(time.getUTCSeconds(), 2) + "." + this.formatDigits(time.getUTCMilliseconds(), 3);

    if (time.getUTCHours() > 0) {
      formattedTime = this.formatDigits(time.getUTCHours(), 2) + ":" + formattedTime;
    }

    return formattedTime;
  }

  formatDigits(value, digits) {
    let number = value + "";

    while (number.length < digits) {
      number = "0" + number;
    }

    return number;
  }

    render() {
      const time = new Date(this.props.data.time);
        return (
          <div key={this.props.key} className={"card " + this.props.className}>
            <Grid container style={{color: this.props.theme.palette.primary.main }}>
                <Grid item sm={1} style={{borderRight: '1px solid #e1e1e1'}}>
                    <span>{this.props.position}</span>
                </Grid>
                <Grid item sm={6}><span>{this.props.data.name}</span></Grid>
                <Grid item sm={5}><span>{this.formatTime(time)}</span></Grid>
            </Grid>
          </div>
        );
    }
}

export default withTheme()(Card);
