import React from 'react';
import { Table, Badge } from 'react-bootstrap';
import { Link } from '@reach/router';

const ElectionsTable = ({ elections, user }) => {
  return (
    <Table striped responsive className="table pad">
      <thead>
        <tr>
          <th className="table-int" />
          <th>Election Title</th>
          <th>Admin</th>
        </tr>
      </thead>
      <tbody>
        {elections.map((election, i) => (
          <tr key={i}>
            <td>
              <Badge>{i + 1}</Badge>
            </td>
            <td>
              <Link to={`/election/${i + 1}`}>{election[1]}</Link>
            </td>
            <td>
              {election[0].toLowerCase() === user.toLowerCase()
                ? 'You'
                : election[0]}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ElectionsTable;
