import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {ForgotPassword} from '../../screens/ForgotPassword';


describe('Register', () => {
    test('Page', () => {
        const tree = renderer.create(<ForgotPassword />).toJSON();
        //console.warn(tree);
        expect(tree.children.length).toBe(7);
    });
    
    test('renders', () => {
        const render = renderer.create(<ForgotPassword />).toJSON();
        expect(render).toMatchSnapshot();
    })
    it('check function', () => {
        let loghand = renderer.create(<ForgotPassword />).getInstance();
        expect(loghand.handleReset()).toBeDefined();


        
    })
    
});