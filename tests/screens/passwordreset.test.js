import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {PasswordReset} from '../../screens/PasswordReset';


describe('Passreset', () => {
    test('Page', () => {
        const tree = renderer.create(<PasswordReset />).toJSON();
        //console.warn(tree);
        expect(tree.children.length).toBe(2);
    });
    
    test('renders', () => {
        const render = renderer.create(<PasswordReset />).toJSON();
        expect(render).toMatchSnapshot();
    })
    
});