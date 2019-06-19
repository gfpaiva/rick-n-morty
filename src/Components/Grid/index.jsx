import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import './Grid.scss';
import Card from '../Card';

const isValidInfo = key => key !== 'name' && key !== 'image' && key !== '__typename' && key !== 'id';
const removeUnderline = key => key.replace(/_/g, ' ');

export default class Grid extends Component {

	componentDidMount() {
		window.addEventListener('scroll', this.handleOnScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleOnScroll);
	}

	handleOnScroll = () => {
		const { onLoadMore } = this.props;

		const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
		const clientHeight = document.documentElement.clientHeight || window.innerHeight;
		const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

		if (onLoadMore && scrolledToBottom) onLoadMore();
	};

	render() {
		const { data, showInfo } = this.props;

		return (
			<div className="grid">
				{data.map((val, idx) => {
					const uniqueKey = val.id || idx;
					let infos = []

					if(showInfo) infos = Object.keys(val).filter(isValidInfo);

					return (
						<Card
							key={uniqueKey}
							title={val.name}
							image={val.image || false}
						>
							{showInfo && (
								infos.map((info, idx) => (
									<Fragment key={idx}>
										{val[info] && (
											<p className="card__info">
												<span className="card__info-key">{removeUnderline(info)}</span>
												<span className="card__info-value">{val[info]}</span>
											</p>
										)}
									</Fragment>
								))
							)}
						</Card>
					)
				})}
			</div>
		)
	}
}

Grid.propTypes = {
	data: PropTypes.array.isRequired,
	showInfo: PropTypes.bool
};