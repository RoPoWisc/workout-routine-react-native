import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {Home} from '../../screens/Home';


describe('Home', () => {
    test('Page', () => {
        const tree = renderer.create(<Home />).toJSON();
        //console.warn(tree);
        expect(tree.children.length).toBe(1);
    });
    
    test('renders', () => {
        const render = renderer.create(<Home />).toJSON();
        expect(render).toMatchSnapshot();
    })
    
});

