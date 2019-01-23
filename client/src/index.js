import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Drizzle, generateStore } from 'drizzle';
import ElectionManager from './contracts/ElectionManager.json';

const options = { contracts: [ElectionManager] };

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));
