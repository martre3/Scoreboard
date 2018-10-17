import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Results from '../results/results';
import { Link, Redirect } from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import NewResult from './newResult';
import './admin.css';
import Api from '../../helpers/API';

class ResultList extends Component {
  constructor() {
    super();

    this.results = React.createRef();

    this.state = {
      page: 0,
      itemsPerPage: 25,
      total: 0,
      loading: false,
      modalOpened: false,
      refresh: null
    };

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.onResponse = this.onResponse.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onNewEntry = this.onNewEntry.bind(this);
    this.setRefreshMethod = this.setRefreshMethod.bind(this);
  };

  nextPage() {
    this.setState({
      page: this.state.page + 1,
      loading: true,
    }, () => {
      this.state.refresh();
    });
  }

  prevPage() {
    this.setState({
      page: this.state.page - 1,
      loading: true,
    }, () => {
      this.state.refresh();
    });
  }

  onResponse(response) {
    this.setState({
      total: response.data.total,
      loading: false
    });
  }

  isNextDisabled() {
    return this.state.total < this.state.itemsPerPage * (this.state.page + 1) || this.state.loading;
  }

  isPreviousDisabled() {
    return this.state.page < 1 || this.state.loading;
  }

  closeModal() {
    this.setState({
      modalOpened: false,
    });
  }

  openModal() {
    this.setState({
      modalOpened: true,
    })
  }

  getModalStyle() {
    const top = 30;

    return {
      top: `${top}%`,
      margin: 'auto',
    };
  }

  onNewEntry() {
    this.closeModal();
    this.state.refresh();
  }

  setRefreshMethod(method) {
    this.setState({
      refresh: method,
    });
  }

  render() {
    return (
      !Api.isAuthenticated() ? <Redirect to={'/'}/> :
        <div style={{color: this.props.theme.palette.primary.main}}>
          <Modal open={this.state.modalOpened} style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}
                 onClose={this.closeModal}>
            <div style={this.getModalStyle()} className={'modal'}>
              <NewResult onFormSubmit={this.onNewEntry}/>
            </div>
          </Modal>
          <Results cardModifier="card-panel" apiUrl="/results/page" requestData={this.state}
                   onResponse={this.onResponse} disableAnimations={true} setRefresh={this.setRefreshMethod} allowEdit={true}/>
          <div>
            <Button onClick={this.openModal} className="new-entry-button inline">New entry</Button>
            <IconButton className="inline" disabled={this.isPreviousDisabled()} color="primary" onClick={this.prevPage}>
              &lt;
            </IconButton>
            <IconButton className="inline" disabled={this.isNextDisabled()} color="primary" onClick={this.nextPage}>
              &gt;
            </IconButton>
            <div className="leaderboard-link-container inline">
              <Link to="/results"><Button>Go to the public leaderboard</Button></Link>
            </div>
          </div>
        </div>
    );
  }
}

export default withTheme()(ResultList);
