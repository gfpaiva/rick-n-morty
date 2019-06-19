import React from 'react';
import gql from 'graphql-tag';

import Template from '../Template';

const GET_LOCATIONS = gql`
	query GET_LOCATIONS($page: Int, $filter: String) {
		locations(page:$page, filter: { name:$filter }) {
			info {
				next
				prev
			}

			results {
				id
				name
				type
				dimension
			}
		}
	}
`

export default function Locations() {
	return (
		<Template
			pageTitle="Localizações"
			pageType="locations"
			query={GET_LOCATIONS}
		/>
	)
}