import React from 'react';
import { Well } from 'react-bootstrap';

const StartEnd = ({ start, end }) => {
  return (
    <Well>
      <div className="alert-bar">
        <div className="alert">
          <strong>Start time:</strong>
          {` ${start}`}
        </div>
        <div className="alert">
          <strong>End time:</strong>
          {` ${end}`}
        </div>
      </div>
    </Well>
  );
};

export default StartEnd;
