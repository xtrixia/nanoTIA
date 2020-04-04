import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navbar({ children }) {
	return (
		<div className='App'>
			<nav className='navbar sticky-top navbar-dark bg-dark'>
				<span className='navbar-brand mb-0 h1'>
					<Link to='/'>nanoTIA</Link>
				</span>
			</nav>

			<div style={{ display: 'flex' }}>
				{children}
			</div>
		</div>
	);
}

Navbar.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element)
};

export default Navbar;
