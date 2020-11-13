import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {Settings} from '../../screens/Settings';


describe('Settings', () => {
    test('Page', () => {
        const tree = renderer.create(<Settings />).toJSON();
        //console.warn(tree);
        expect(tree.children.length).toBe(2);
    });
    
    test('renders', () => {
        const render = renderer.create(<Settings />).toJSON();
        expect(render).toMatchSnapshot();
    })
    it('works', () => {
        const obj = new Settings(1);
        expect(obj).toBeDefined();
        
      });
    
});

