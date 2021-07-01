import React from 'react';
import { render } from 'react-dom';
import { fork } from 'effector/fork';

import { root } from 'effector-root';
import { Application } from './application';

describe('<App />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div');
    const scope = fork(root);
    render(<Application root={scope} />, div);
  });
});
