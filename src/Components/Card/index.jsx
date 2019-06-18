import React from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

export default function Card({ title, image, children }) {
	return (
			<div className="card">
				{image && (
					<div className="card__image-wrapper">
						<img className="card__image full-width" src={image} alt={title} title={title} />
					</div>
				)}

				<p className="card__title">
					{title}
				</p>

				{children && (
					<div className="card__description">
						{children}
					</div>
				)}
			</div>

	)
}

Card.propTypes = {
	title: PropTypes.string.isRequired,
	image: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
};