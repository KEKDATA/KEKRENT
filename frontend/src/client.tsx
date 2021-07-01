// import { createInspector } from 'effector-inspector';
import React from 'react';
import ReactDOM from 'react-dom';
import { hydrate } from 'effector/fork';

import { root } from 'effector-root';
import { Application } from './application';

// import { LOGGER_DOMAIN_NAME } from 'effector-logger/attach';
// createInspector({ trimDomain: LOGGER_DOMAIN_NAME });

ReactDOM.hydrate(<Application />, document.querySelector('#root'));

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
