import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import './Navbar.css';


class Navbar extends Component {
	render() {
		return(
			<nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#191919'}}>
				<Link className="navbar-brand" to="/news">WhereDevs.dev</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<ul className="navbar-nav">
						<li className="nav-item"><NavLink className="nav-link" exact to="/news">News</NavLink></li>
						<li className="nav-item"><NavLink className="nav-link" exact to="/sources">Sources</NavLink></li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Navbar;