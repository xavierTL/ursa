import React from 'react';
import { Table } from 'react-bootstrap';

const ReviewTable = ({ data, dataArray }) => {
  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th className="table-int">#</th>
          <th>{data}</th>
        </tr>
      </thead>
      <tbody>
        {dataArray.map((datum, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{datum}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReviewTable;
