import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
export default class collapseRadio extends Component {
  state = {
    open: false,
    value: 0
  };
  componentDidMount() {
    if (this.props.initState) {
      this.setState({
        open: this.props.initState
      });
    }
  }
  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleAngle = () =>
    this.state.open ? (
      <FontAwesomeIcon icon={faAngleUp} className='icon' />
    ) : (
      <FontAwesomeIcon icon={faAngleDown} className='icon' />
    );

  handleChange = e => {
    this.setState(
      {
        value: e.target.value
      },
      () => {
        this.props.handleFilters(this.state.value);
      }
    );
  };

  displayItems = () =>
    this.props.list
      ? this.props.list.map(item => (
          <FormControlLabel
            key={item._id}
            value={`${item._id}`}
            control={<Radio />}
            label={item.name}
          ></FormControlLabel>
        ))
      : null;

  render() {
    return (
      <div>
        <List style={{ borderBottom: '1px solid #dbdbdb' }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: '10px 23px 10px 0' }}
          >
            <ListItemText
              primary={this.props.title}
              className='collapse_title'
            />
            {this.handleAngle()}
          </ListItem>

          <Collapse in={this.state.open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <RadioGroup
                aria-label='label'
                name='prices'
                value={`${this.state.value}`}
                onChange={this.handleChange}
              >
                {this.displayItems()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}
