import React from 'react';
import { Button, Table } from 'react-bootstrap';
import ReviewTable from './ReviewTable';
const moment = require('moment');

const ElectionFormReview = ({ toggleCompleted, electionData }) => {
  const { title, stringStart, stringEnd, candidates, voters } = electionData;
  console.log(electionData);
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
      <ReviewTable data={'Candidates'} dataArray={candidates} />
      <ReviewTable data={'Voters'} dataArray={voters} />
      <Button onClick={() => toggleCompleted()}>Launch!</Button>
    </>
  );
};

export default ElectionFormReview;
