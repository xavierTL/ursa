import React from 'react';
import { Jumbotron, Image } from 'react-bootstrap';

const JumboHead = ({ text, imgId }) => {
  return (
    <Jumbotron className="new-election-jumbo">
      <div className="new-election-header">
        <div className="new-election-title">
          <h1>{text}</h1>
        </div>
        <div className="new-election-logo">
          <Image
            src={`https://image.flaticon.com/icons/svg/1346/${imgId}.svg`}
            className="icon"
          />
        </div>
      </div>
    </Jumbotron>
  );
};

export default JumboHead;
