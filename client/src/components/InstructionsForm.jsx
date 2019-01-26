import React from 'react';
import { Form, FormGroup, Checkbox } from 'react-bootstrap';

const InstructionsForm = ({ understand }) => {
  return (
    <Form>
      <FormGroup>
        <div className="check-boxes">
          <ol>
            <li>The Metamask chrome extension.</li>
            <li>Ether in your wallet.</li>
            <li>
              At least one candidate or simple proposition in mind (e.g. "We
              should eat lasagne").
            </li>
            <li>At least one user who can vote in your election.</li>
            <li>Public keys for each user.</li>
            <li>A start and end time for the election.</li>
          </ol>
          <Checkbox onClick={() => understand()} inline className="center">
            I understand
          </Checkbox>
        </div>
      </FormGroup>
    </Form>
  );
};

export default InstructionsForm;
