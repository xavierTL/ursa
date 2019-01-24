import React, { Component } from 'react';
import {
  ProgressBar,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';
import NewElectionHeader from './NewElectionHeader';

class NewElectionForm extends Component {
  state = {
    title: '',
    titleDone: false
  };
  render() {
    const { title, titleDone } = this.state;
    let now = [titleDone].filter(x => x === true).length * 20;
    return (
      <div>
        <NewElectionHeader />
        <ProgressBar now={now} active label={`${now}%`} />
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState('title')}
          >
            <ControlLabel>Title.</ControlLabel>
            <FormControl
              type="text"
              value={title}
              placeholder="e.g. 'Who should cook dinner tonight?'"
              onChange={this.handleTitleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Must be at least 10 characters.</HelpBlock>
          </FormGroup>
        </form>
      </div>
    );
  }
  componentDidMount = async () => {
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    console.log(await methods.smokeTest().call());
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value }, () => {
      const { title } = this.state;
      if (title.length > 10) {
        this.setState({ titleDone: true });
      } else {
        this.setState({ titleDone: false });
      }
    });
  };

  getValidationState(data) {
    const length = this.state[data].length;
    return length > 10 ? 'success' : 'warning';
  }
}

export default NewElectionForm;
