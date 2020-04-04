import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navbar from './ui_palette/Navbar';
import ListContent from './list';
import DetailContent from './detail';

import store from '../stores';

import './App.css';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Navbar>
						<Route exact path='/' component={ListContent} />
						<Route exact path='/:slugId' component={DetailContent} />
					</Navbar>
				</Switch>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
