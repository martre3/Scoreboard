import React, { Component } from 'react';
import API from '../../helpers/API';
import { withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './results.css';
import FlipMove from 'react-flip-move';
import Icon from '@mdi/react';
import { mdiAccountOutline, mdiClockOutline, mdiTrophyVariantOutline } from '@mdi/js'
import Card from './card';

const REFRESH_RATE = 100000;

class Results extends Component {

  constructor() {
    super();
    this.state = {
      results: [],
      fetchInterval: null,
    };

    this.fetchResults = this.fetchResults.bind(this);
  }

  componentDidMount() {
    this.fetchResults();
    const fetchInterval = setInterval(this.fetchResults, REFRESH_RATE);
    this.setState({fetchInterval: fetchInterval});

    if (typeof this.props.setRefresh !== 'undefined') {
      this.props.setRefresh(this.fetchResults);
    }
  }

  fetchResults() {
    API.axios.post(this.props.apiUrl, this.props.requestData)
      .then((res) => {
        const offset = typeof this.props.requestData === 'undefined' ? 0 : this.props.requestData.page * this.props.requestData.itemsPerPage;

        const results = res.data.data.map((result, index) => <Card key={result.id} className={this.props.cardModifier} data={result} position={offset + index + 1}/>);
        this.setState({
          results: results
        });

        if (typeof this.props.onResponse !== 'undefined') {
          this.props.onResponse(res);
        }
      })
      .catch ((err) => {
        console.log(err);
      });
  }

  render() {
    return (
        <Paper className="results-container">
            <Grid container className={"card card-header " + this.props.cardModifier}>
                <Grid item lg={1} >
                    <Icon path={mdiTrophyVariantOutline} size={'calc(5px + 1em)'} className="mdi mdi-trophy-variant-outline"/>
                </Grid>
                <Grid item lg={6}><Icon path={mdiAccountOutline} size={'calc(5px + 1em)'} className="mdi mdi-account-outline"/></Grid>
                <Grid item lg={5}><Icon path={mdiClockOutline} size={'calc(5px + 1em)'} className="mdi mdi-clock-outline"/></Grid>
            </Grid>
          <FlipMove enterAnimation={this.props.disableAnimations ? "none" : "fade"} leaveAnimation={this.props.disableAnimations ? "none" : "fade"}>
            {this.state.results}
          </FlipMove>
        </Paper>
    );
  }
}

export default withTheme()(Results);
