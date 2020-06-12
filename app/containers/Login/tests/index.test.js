import React from 'react';
import ReactDom from 'react-dom';
// import { mount } from 'enzyme';
// import { enzymeFind } from 'styled-components/test-utils';

import { Login } from '../index';
describe('<Login/>', () => {
  it('Renders without crashing', () => {
    const loginAction = () => {
    };
    const div = document.createElement('div');
    ReactDom.render(<Login loginAction={loginAction} />, div);
  });
});
