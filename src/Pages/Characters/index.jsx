import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Error from '../../Components/Error';
import Loading from '../../Components/Loading';
import Grid from '../../Components/Grid';
import Header from '../../Components/Header';

const GET_CHARS = gql`
	query GET_CHARS($page: Int) {
		characters(page:$page) {
			info {
				next
				prev
			}

			results {
				name
				status
				species
				type
				gender
				image
			}
		}
	}
`

export default function Characters() {
	return (
		<div className="characters">
			<Header />

			<Query
				query={GET_CHARS}
				notifyOnNetworkStatusChange={true}
			>
				{({ data, loading, error, fetchMore }) => {
					if(error) return <Error message="Ops! Ocorreu um erro ao recuperar as informações" />

					const { characters } = data;

					return (
						<div className="container">
							<h1 className="text-center">Personagens</h1>

							{data && characters && (
								<Grid
									data={characters.results}
									onLoadMore={() => {
										fetchMore({
											variables: {
												page: characters.info.next
											},

											updateQuery: (previousResult = {}, { fetchMoreResult = {} }) => {
												const previousSearch = previousResult.characters || {};
												const currentSearch = fetchMoreResult.characters || {};
												const previousNodes = previousSearch.results || [];
												const currentNodes = currentSearch.results || [];
												return {
													...previousResult,
													characters: {
														...previousSearch,
														results: [...previousNodes, ...currentNodes],
														info: currentSearch.info,
													},
												};
											},
										})
									}}
									showInfo
								/>
							)}

							{loading && <Loading />}
						</div>
					)
				}}
			</Query>
		</div>
	)
}