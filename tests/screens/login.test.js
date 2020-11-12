import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {Login} from '../../screens/Login'

describe('Login', () => {
    test('Page', () => {
        const tree = renderer.create(<Login />).toJSON();
        //console.warn(tree);
        expect(tree.children.length).toBe(9);
    });
    
    test('renders', () => {
        const render = renderer.create(<Login />).toJSON();
        expect(render).toMatchSnapshot();
    })
    
});