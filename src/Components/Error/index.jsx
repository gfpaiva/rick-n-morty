import React from 'react';
import PropTypes from 'prop-types';

import error from './morty-error.png'

export default function Error({ message }) {
	return (
		<>
			<img className="error__image" src={error} alt="Morty" title="Morty" />
			<span className="error__message">{message}</span>
		</>
	)
}

Error.propTypes = {
	message: PropTypes.string.isRequired,
};