import React from 'react';
import gql from 'graphql-tag';

import Template from '../Template';

const GET_EPISODES = gql`
	query GET_EPISODES($page: Int, $filter: String) {
		episodes(page:$page, filter: { name:$filter }) {
			info {
				next
				prev
			}

			results {
				id
				name
				air_date
				episode
			}
		}
	}
`

export default function Episodes() {
	return (
		<Template
			pageTitle="Episódios"
			pageType="episodes"
			query={GET_EPISODES}
		/>
	)
}