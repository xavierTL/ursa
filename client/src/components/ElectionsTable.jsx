import React from 'react';
import { Table, Badge, Image } from 'react-bootstrap';
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
        {elections.map((election, i) => {
          const owned = election[0].toLowerCase() === user.toLowerCase();
          return (
            <tr key={i}>
              <td>
                <Badge>{i + 1}</Badge>
              </td>
              <td>
                <Link to={`/election/${i + 1}`}>{election[1]}</Link>
              </td>
              <td>
                {`${election[0].slice(0, 5)}...${election[0].slice(37)} `}
                {owned ? (
                  <Image
                    src={`https://image.flaticon.com/icons/svg/1346/1346567.svg`}
                    className="tiny-icon"
                  />
                ) : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ElectionsTable;
