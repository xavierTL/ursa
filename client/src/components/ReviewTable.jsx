import React from 'react';
import { Table, Badge } from 'react-bootstrap';

const ReviewTable = ({ data, dataArray }) => {
  return (
    <Table striped responsive className="table pad">
      <thead>
        <tr>
          <th className="table-int" />
          <th>{data}</th>
        </tr>
      </thead>
      <tbody>
        {dataArray.map((datum, i) => (
          <tr key={i}>
            <td>
              <Badge>{i + 1}</Badge>
            </td>
            <td>{datum}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReviewTable;
