import React, { Component } from 'react';
import API from '../../helpers/API';
import { withTheme } from '@material-ui/core/styles';

class Results extends Component {

  constructor() {
    super();
    this.state = {
      results: []
    };

    this.fetchResults = this.fetchResults.bind(this);
  }

  componentDidMount() {
    this.fetchResults();
  }

  fetchResults() {
    API.axios.get('/results')
      .then((res) => {
        const results = res.data.map((result) => <li style={{color: this.props.theme.palette.primary.main }}>{result.name} {result.time}</li>);
        this.setState({
          results: results
        });
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.results}
        </ul>
      </div>
    );
  }
}

export default withTheme()(Results);
