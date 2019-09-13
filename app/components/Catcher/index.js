// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

export default class Catcher extends Component {
    state = {
        error: false,
    };

    componentDidCatch (error, stack) {
        console.log('ERROR:', error);
        console.log('STACKTRACE:', stack.componentStack);

        this.setState({
            error: true,
        });
    }

    render () {
        if (this.state.error) {
            return (
                <section className = { Styles.catcher }>
                    <span>Error occured</span>
                    <p>Our space engineers fixing that already</p>
                </section>
            );
        }

        return this.props.children;
    }
}
