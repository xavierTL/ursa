import React from 'react';
import { PieChart } from 'react-easy-chart';
import { Table } from 'react-bootstrap';

const Results = ({ pieData }) => {
  return (
    <div className="flex">
      <div className="f-one pad">
        <Table responsive striped>
          <thead>
            <tr>
              <th className="table-int">Candidate</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {pieData.map((datum, i) => (
              <tr key={i}>
                <td>{datum.key}</td>
                <td>{datum.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="f-two pad">
        <PieChart size={300} labels innerHoleSize={150} data={pieData} />
      </div>
    </div>
  );
};

export default Results;
