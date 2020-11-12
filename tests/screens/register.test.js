import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {Signup} from '../../screens/Register';


describe('Register', () => {
    test('Page', () => {
        const tree = renderer.create(<Signup />).toJSON();
        //console.warn(tree);
        expect(tree.children.length).toBe(9);
    });
    
    test('renders', () => {
        const render = renderer.create(<Signup />).toJSON();
        expect(render).toMatchSnapshot();
    })
    
});