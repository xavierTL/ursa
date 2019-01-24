import { Navbar, Nav, NavItem } from 'react-bootstrap';
import React, { Component } from 'react';
import '../App.css';

class UrsaHeader extends Component {
  render() {
    const { user } = this.props;
    return (
      <Navbar className="nav-bar">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">Ursa</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">
            New Election
          </NavItem>
          <NavItem eventKey={2} href="#">
            Elections
          </NavItem>
        </Nav>
        <Navbar.Collapse>
          <Navbar.Text pullRight>{`user: ${user}`}</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default UrsaHeader;
