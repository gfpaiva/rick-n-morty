import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { Query } from 'react-apollo';

import Error from '../../Components/Error';
import Loading from '../../Components/Loading';
import Grid from '../../Components/Grid';
import Header from '../../Components/Header';

import './Template.scss'

export default class Template extends Component {
	state = {
		isSearch: false,
		searchTerm: '',
		completedQuery: false
	}

	FetchError = () => <Error message="Ops! Ocorreu um erro ao recuperar as informações" />

	updateQuery = (previousResult = {}, { fetchMoreResult = {} }) => {
		const { pageType } = this.props;

		const previousSearch = previousResult[pageType] || {};
		const currentSearch = fetchMoreResult[pageType] || {};
		const previousNodes = previousSearch.results || [];
		const currentNodes = currentSearch.results || [];
		const newObjectResults = {
			...previousResult,
			[pageType]: {
				...previousSearch,
				results: [...previousNodes, ...currentNodes],
				info: currentSearch.info,
			}
		};
		return newObjectResults;
	}

	handleSubmit = e => {
		e.preventDefault();

		const searchTerm = e.target.search.value;

		this.setState({
			searchTerm,
			isSearch: true,
			completedQuery: false
		});
	}

	handleComplete = () => {
		this.setState({ completedQuery: true })
	}

	render() {
		const { isSearch, searchTerm, completedQuery } = this.state;
		const { query, pageType, pageTitle } = this.props;
		const pageName = pageTitle || pageType;

		return (
			<div className={pageType}>
				<Header />

				<div className="container">
					<h1 className="text-center">{pageName}</h1>

					<form className="search-form" onSubmit={this.handleSubmit}>
						<input
							autoComplete="off"
							className="search-form__input"
							id="search"
							name="search"
							placeholder={`Buscar ${pageName}`}
							required
							type="text"
						/>
						<button className="search-form__button" type="submit">
							<FaSearch />
						</button>
					</form>

					<Query
						query={query}
						variables={isSearch ? { filter: searchTerm } : {}}
						notifyOnNetworkStatusChange={true}
						onCompleted={this.handleComplete}
					>
						{({ data, loading, error, fetchMore }) => {
							if(error || !data) return this.FetchError();

							const resultData = data[pageType];

							return (
								<>
									{isSearch && !loading && <h2>Resultados para: {searchTerm}</h2>}

									{completedQuery && resultData && resultData.results && (
										<Grid
											data={resultData.results}
											onLoadMore={resultData.info.pages > 1 ? () => {
												!loading && resultData.info.next && fetchMore({
													variables: {
														page: resultData.info.next
													},
													updateQuery: this.updateQuery
												})
											} : false}
											showInfo
										/>
									)}

									{!loading && (!data || !resultData || !resultData.results) && <Error message={`Não encontramos ${pageName}`} />}

									{loading && <Loading />}
								</>
							)
						}}
					</Query>
				</div>
			</div>
		)
	}
}

Template.propTypes = {
	query: PropTypes.object.isRequired,
	pageType: PropTypes.string.isRequired,
	pageTitle: PropTypes.string
};