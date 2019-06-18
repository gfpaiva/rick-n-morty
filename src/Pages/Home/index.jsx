import React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';
import logo from '../../rick-n-morty-logo.png';
import rick from './rick-emoji.png'
import morty from './morty-emoji.png'

export default function Home() {
	return (
		<div className="home text-center page__full-center container">
			<p>
				<img className="full-width" src={logo} alt="Rick and Morty" title="Rick and Morty" /><br />
				Bem vindo ao explorador do universo

				<strong>
					<img className="home__emoji" src={rick} alt="Rick" title="Rick" />
					Rick and Morty
					<img className="home__emoji" src={morty} alt="Morty" title="Morty" />
				</strong>

				<br />

				Para começar selecione o que deseja explorar: &nbsp;
				<Link to="/characters" className="linked">Personagens</Link>, <Link to="/locations" className="linked">Localizações</Link>, <Link to="/episodes" className="linked">Episódios</Link>
			</p>
		</div>
	)
}