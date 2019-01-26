import React from 'react';
import { Button, Well } from 'react-bootstrap';

const ElectionFormReview = ({ toggleCompleted, electionData }) => {
  return (
    <>
      <Well>Look I'm in a well!</Well>
      <Button onClick={() => toggleCompleted()}>Launch!</Button>
    </>
  );
};

export default ElectionFormReview;
