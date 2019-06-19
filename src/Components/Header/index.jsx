import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './Header.scss';
import logo from '../../rick-n-morty-logo.png'

export default function Header() {
	return (
		<header className="header">
			<nav className="header__nav container">
				<ul className="header__nav-list">
					<li className="header__nav-item">
						<Link to="/">
							<img className="header__logo" src={logo} alt="Rick and Morty" title="Rick and Morty" />
						</Link>
					</li>

					<li className="header__nav-item">
						<NavLink activeClassName="linked" to="/characters">
							Personagens
						</NavLink>
					</li>

					<li className="header__nav-item">
						<NavLink activeClassName="linked" to="/locations">
							Localizações
						</NavLink>
					</li>

					<li className="header__nav-item">
						<NavLink activeClassName="linked" to="/episodes">
							Episódios
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}