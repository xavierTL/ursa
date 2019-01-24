import React from 'react';
import { Form, FormGroup, Checkbox } from 'react-bootstrap';

const InstructionsForm = ({ tick }) => {
  return (
    <Form>
      <FormGroup>
        <div className="check-boxes">
          <Checkbox onClick={() => tick(0)} inline>
            Metamask chrome extension.
          </Checkbox>
          <Checkbox onClick={() => tick(1)} inline>
            Ether in your wallet.
          </Checkbox>
          <Checkbox onClick={() => tick(2)} inline>
            At least one candidate or simple proposition in mind (e.g. "We
            should eat lasagne").
          </Checkbox>
          <Checkbox onClick={() => tick(3)} inline>
            At least one user who can vote in your election.
          </Checkbox>
          <Checkbox onClick={() => tick(4)} inline>
            Public keys for each user.
          </Checkbox>
          <Checkbox onClick={() => tick(5)} inline>
            A start and end time for the election.
          </Checkbox>
        </div>
      </FormGroup>
    </Form>
  );
};

export default InstructionsForm;
