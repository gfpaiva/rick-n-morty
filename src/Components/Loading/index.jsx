import React from 'react';

import './Loading.scss';
import loading from './loading.png'

export default function Loading() {
	return (
			<div className="loading text-center">
				<img className="loading__image" src={loading} alt="Portal" title="Portal" /><br />
				<span className="loading__message">Carregando...</span>
			</div>

	)
}