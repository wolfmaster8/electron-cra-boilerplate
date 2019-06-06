import React from 'react';
import react from './react.svg';
import electron from './electron.svg';
import './App.css'

const App = () => {
	return (
		<div className="App">
			<header className="App-header">
				<div className="App-flex">
					<img className="App-logo" alt="electron" src={ electron }/>
					<img className="App-logo" alt="react " src={ react }/>
				</div>
				<h1 className="App-title">Welcome to beautiful Electron with CRA</h1>
			</header>
		</div>
	);
};

export default App;
