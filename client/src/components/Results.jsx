import React from 'react';
import { PieChart, Legend } from 'react-easy-chart';
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
        <PieChart size={300} innerHoleSize={150} data={pieData} />
        <Legend data={pieData} dataId={'key'} horizontal />
      </div>
    </div>
  );
};

export default Results;
