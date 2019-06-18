import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from '../../Utils/Routes';

import './App.scss';

export default function App() {
	return (
		<main className="app">
			<section className="app__content">
				<Switch>
					{routes.map(route => (
						<Route {...route} />
					))}
				</Switch>
			</section>
		</main>
	)
}