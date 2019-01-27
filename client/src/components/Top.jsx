import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

class Top extends Component {
  render() {
    return (
      <div className="logo-cont">
        <Image
          src="https://image.flaticon.com/icons/svg/1346/1346537.svg"
          // src="https://image.flaticon.com/icons/svg/281/281326.svg"
          className="spin logo"
        />
      </div>
    );
  }
}

export default Top;
