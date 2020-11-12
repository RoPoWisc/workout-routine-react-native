import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {Workout} from '../../screens/Workout';


describe('Workout', () => {
    test('Page', () => {
        const tree = renderer.create(<Workout />).toJSON();
        //console.warn(tree);
        expect(tree.children.length).toBe(1);
    });
    
    test('renders', () => {
        const render = renderer.create(<Workout />).toJSON();
        expect(render).toMatchSnapshot();
    })
    
});

