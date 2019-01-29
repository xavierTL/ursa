import React from 'react';
import { Button, Table, Well } from 'react-bootstrap';
import ReviewTable from './ReviewTable';
const moment = require('moment');

const ElectionFormReview = ({ toggleCompleted, electionData }) => {
  const { title, stringStart, stringEnd, voters } = electionData;
  let start = JSON.parse(stringStart);
  let end = JSON.parse(stringEnd);
  start = moment(start).format('dddd, MMMM Do YYYY, h:mm:ss a');
  end = moment(end).format('dddd, MMMM Do YYYY, h:mm:ss a');
  return (
    <>
      <Table responsive striped>
        <thead>
          <tr>
            <th className="table-int">Title</th>
            <th>Opens</th>
            <th>Closes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{title}</td>
            <td>{start}</td>
            <td>{end}</td>
          </tr>
        </tbody>
      </Table>
      <ReviewTable data={'Voters'} dataArray={voters} />
      <Well>You'll get to add candidates later!</Well>
      <Button onClick={() => toggleCompleted()}>Launch!</Button>
    </>
  );
};

export default ElectionFormReview;
