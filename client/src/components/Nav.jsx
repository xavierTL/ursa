import { Navbar, Image } from 'react-bootstrap';
import React, { Component } from 'react';
import '../App.css';
import { Link } from '@reach/router';

class Nav extends Component {
  render() {
    const { user } = this.props;
    return (
      <Navbar className="nav-bar">
        <div className="nav-inner">
          <div className="nav-wide start">
            <Navbar.Text>
              <Link to="/home">Home</Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link to="elections">Elections</Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link to="new-election">New Election</Link>
            </Navbar.Text>
          </div>
          <div className="nav-narrow flex-center">
            <Image
              src="https://image.flaticon.com/icons/svg/1346/1346537.svg"
              className="spin logo"
            />
          </div>
          <div className="nav-wide end">
            <Navbar.Text>{`User: ${user.slice(0, 5)}...${user.slice(
              37
            )}`}</Navbar.Text>
          </div>
        </div>
      </Navbar>
    );
  }
}

export default Nav;
