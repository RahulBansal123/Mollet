import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configureStore } from './store/configureStore';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById('react-root')
);

if (process.env.NODE_ENV !== 'development') console.log = () => {};
