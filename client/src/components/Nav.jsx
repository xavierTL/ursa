import { Navbar, Image } from 'react-bootstrap';
import React, { Component } from 'react';
import '../App.css';
import { Link } from '@reach/router';

class Nav extends Component {
  render() {
    const { user } = this.props;
    return (
      <Navbar className="nav-bar">
        <Navbar.Text>
          <Link to="/home">Home</Link>
        </Navbar.Text>
        <Navbar.Text>
          <Link to="elections">Elections</Link>
        </Navbar.Text>{' '}
        <Navbar.Text>
          <Link to="new-election">New Election</Link>
        </Navbar.Text>
        <Navbar.Collapse>
          <Navbar.Text pullRight>{`User: ${user}`}</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Nav;
