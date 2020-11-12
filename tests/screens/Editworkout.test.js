import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {EditWork} from '../../screens/EditWorkout';


describe('Edit workout', () => {
    test('Page', () => {
        const tree = renderer.create(<EditWork />).toJSON();
        //console.warn(tree);
        expect(tree.children.length).toBe(1);
    });
    
    test('renders', () => {
        const render = renderer.create(<EditWork />).toJSON();
        expect(render).toMatchSnapshot();
    })
    
});

