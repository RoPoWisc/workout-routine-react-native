import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {AddWork} from '../../screens/AddWorkout';


describe('Add Workout', () => {
    test('Page', () => {
        const tree = renderer.create(<AddWork />).toJSON();
        //console.warn(tree);
        expect(tree.children.length).toBe(1);
    });
    
    test('renders', () => {
        const render = renderer.create(<AddWork />).toJSON();
        expect(render).toMatchSnapshot();
    })
    
});

