import React, { useState } from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';
import Menu from '../../assets/icons/menu.svg';
import Cross from '../../assets/icons/cross.svg';

const Header = () => {
	const [show, setShow] = useState(false);
	return (
		<div className="header">
			<h2 className="header__logo">
				<a href="/">Mollet</a>
			</h2>
			<div className="header__navbar">
				<NavLink
					to="/"
					className="header__navitems"
					activeClassName="header__navitems_active">
					Home
				</NavLink>
				<NavLink
					to="/monitor"
					className="header__navitems"
					activeClassName="header__navitems_active">
					Monitor
				</NavLink>
			</div>
			<div className="navbar__mobile" onClick={() => setShow(true)}>
				<img src={Menu} alt="Menu" className="navbar__mobile_icons" />
			</div>
			<div
				className="navbar__mobile_items"
				style={{ display: show ? 'block' : 'none' }}>
				<div
					className="navbar__mobile_items_close"
					onClick={() => setShow(false)}>
					<img src={Cross} alt="Close" />
				</div>
				<div className="navbar__mobile_items_container">
					<NavLink to="/" className="navbar__mobile_items_item">
						Home
					</NavLink>
					<NavLink to="/monitor" className="navbar__mobile_items_item">
						Monitor
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Header;
