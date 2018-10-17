import React, { Component } from 'react';
import './App.css';
import Login from "./components/login/login";
import Leaderboard from "./components/leaderboard/leaderboard";
import ResultList from "./components/admin/resultList";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { HashRouter, Route } from "react-router-dom";

class App extends Component {
  theme = createMuiTheme({
    palette: {
      primary: {
        main: '#000000',
      },
    },
      badge: {
        width: 50
      }
  });

  render() {
    return (
        <MuiThemeProvider theme={this.theme}>
          <div className="App">
            <HashRouter path="/">
              <header className="App-header">
                  <Route exact path="/" component={Login} />
                  <Route exact path="/results" component={Leaderboard} />
                  <Route exact path="/admin" component={ResultList} />
              </header>
            </HashRouter>
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
