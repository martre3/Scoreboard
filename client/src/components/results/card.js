import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './results.css';
import {withTheme} from "@material-ui/core/styles/index";
import Icon from '@mdi/react';
import { mdiCloseCircleOutline } from '@mdi/js'
import Modal from '@material-ui/core/Modal';
import CardUI from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import API from '../../helpers/API';

class Card extends Component {
  constructor() {
    super();

    this.state = {
      modalOpened: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.removeCard = this.removeCard.bind(this);
  }

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

  openModal() {
    this.setState({
      modalOpened: true,
    });
  }

  closeModal() {
    this.setState({
      modalOpened: false,
    });
  }

  removeCard() {
    API.axios.post('/auth/remove', {id: this.props.id})
      .then((res) => {
        this.closeModal();
        this.props.refresh();
      });
  }

  getModalStyle() {
    const top = 30;

    return {
      top: `${top}%`,
      margin: 'auto',
    };
  }

  render() {
    const time = new Date(this.props.data.time);
    return (
      <div key={this.props.id} className={"card " + this.props.className}>
        <Modal open={this.state.modalOpened} style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}
          onClose={this.closeModal}>
          <div style={this.getModalStyle()} className={'modal'}>
            <CardUI>
              <CardHeader title={"Remove this entry?"}/>
              <CardContent>
                <Button onClick={this.removeCard}>
                  Yes
                </Button>
                <Button onClick={this.closeModal}>
                  No
                </Button>
              </CardContent>
            </CardUI>
          </div>
        </Modal>
        <Grid container style={{color: this.props.theme.palette.primary.main}}>
          <Grid item xs={1} style={{borderRight: '1px solid #e1e1e1'}}>
            <span>{this.props.position}</span>
          </Grid>
          <Grid item xs={6}><span>{this.props.data.name}</span></Grid>
          <Grid item xs={this.props.allowEdit ? 4 : 5}><span>{this.formatTime(time)}</span></Grid>
          {this.props.allowEdit ?
            <Grid item xs={1}><Icon onClick={this.openModal} color={'red'} path={mdiCloseCircleOutline} className={'remove-btn'} size={'calc(5px + 1em)'}/></Grid>
            : ''
          }
        </Grid>
      </div>
    );
  }
}

export default withTheme()(Card);
