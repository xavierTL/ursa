import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

class Top extends Component {
  render() {
    return (
      <div className="logo-cont">
        <Image
          src="https://image.flaticon.com/icons/svg/1346/1346537.svg"
          circle
          className="spin logo"
        />
      </div>
    );
  }
}

export default Top;
