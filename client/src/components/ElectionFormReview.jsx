import React from 'react';
import { Button, Well, Table } from 'react-bootstrap';

const ElectionFormReview = ({ toggleCompleted, electionData }) => {
  console.log(electionData);
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{electionData.title}</td>
            <td>{electionData.startDate}</td>
            <td>{electionData.endDate}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Candidates</th>
            <th>Voters</th>
          </tr>
        </thead>
      </Table>
      <Button onClick={() => toggleCompleted()}>Launch!</Button>
    </>
  );
};

export default ElectionFormReview;
