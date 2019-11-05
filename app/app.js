/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Theme
import './theme/init.css';

const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <HashRouter>
      <App/>
    </HashRouter>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  }).catch(err => {
    throw err;
  });
} else {
  render();
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// if (process.env.NODE_ENV === 'production') {
//   require('offline-plugin/runtime').install(); // eslint-disable-line global-require
// }
