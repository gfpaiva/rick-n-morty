import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import App from './Components/App';

import './_redirects';
import './index.scss';
import './bg.gif'

const API_URL = `https://rickandmortyapi.com`;
const link = new HttpLink({
	uri: `${API_URL}/graphql`
});
const cache = new InMemoryCache();
const client = new ApolloClient({
	link,
	cache
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<App />
		</Router>
	</ApolloProvider>
	, document.getElementById('app')
);