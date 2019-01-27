import React from 'react';
import { Jumbotron, Image } from 'react-bootstrap';

const JumboHead = ({ text, sub, imgId }) => {
  return (
    <Jumbotron className="jumbo">
      <div className="jumbo-outer">
        <div className="title">
          <h1>{text}</h1>
          <h3>{sub}</h3>
        </div>
        <div className="icon-cont">
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
