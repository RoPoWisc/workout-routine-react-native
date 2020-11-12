import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {Progress} from '../../screens/Progress';


describe('Progress', () => {
    test('Page', () => {
        const tree = renderer.create(<Progress />).toJSON();
        //console.warn(tree);
        expect(tree.children.length).toBe(1);
    });
    
    test('renders', () => {
        const render = renderer.create(<Progress />).toJSON();
        expect(render).toMatchSnapshot();
    })
    
});

