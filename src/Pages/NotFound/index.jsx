import React from 'react';

import Error from '../../Components/Error';

export default function NotFound() {
	return <h1 className="not-found text-center page__full-center my-0"><Error message="Página não encontrada" /></h1>
}