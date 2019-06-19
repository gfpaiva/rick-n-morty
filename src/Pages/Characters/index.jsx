import React from 'react';
import gql from 'graphql-tag';

import Template from '../Template';

const GET_CHARS = gql`
	query GET_CHARS($page: Int, $filter: String) {
		characters(page:$page, filter: { name:$filter }) {
			info {
				pages
				next
				prev
			}

			results {
				id
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
		<Template
			pageTitle="Personagens"
			pageType="characters"
			query={GET_CHARS}
		/>
	)
}