import React from 'react';
import Routing from './components/Routing';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Routing />
			</BrowserRouter>
		);
	}
}

export default App;
