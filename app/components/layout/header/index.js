// Core
import React, { Component } from 'react';

// Components
import Burger from 'components/ui/mobileMenu';
import LogOutIcon from 'components/ui/logOutIcon';
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import styles from './styles.css';
import grid from 'theme/grid.css';
import logo from 'images/logo-header.png';

@withProfile
export default class Header extends Component {
	render() {
    const { _logOut, state } = this.props;

		return (
			<header className = { styles.header }>
				<div className = { grid.container }>
					<div className = { styles.content }>
						<Burger/>
						<a href = '#' className = { styles.logo }><img src = { logo } /></a>
						<div className = { styles.btnWrapper }>
							{/*<a href = '#' className = { styles.userLink }></a>*/}
							<button
                type = 'button'
                title = 'logout'
                className = { styles.logOut }
                onClick={(JSON.parse(state.auth) === true) && (() =>_logOut()) || null}>
								<LogOutIcon className = { styles.logOut }/>
							</button>
						</div>
					</div>
				</div>
			</header>
		);
	}
}
