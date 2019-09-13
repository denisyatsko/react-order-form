// Core
import React, { Component } from 'react';

// Instruments
import styles from './styles.css';

class Burger extends Component {
	_onClickHandler = () => {
		alert('here was redux ;)')
	};

	render() {
		const { visibleMobileMenu } = this.props;

		return (
			<div
				onClick = { this._onClickHandler }
				className = {`${styles.burger} ${ visibleMobileMenu ? styles.on : '' }`}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		);
	}
}

export default Burger;
