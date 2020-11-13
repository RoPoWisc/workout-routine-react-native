import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {Initial} from '../../screens/initial';


describe('Initial', () => {
    
    test('renders', () => {
        const render = renderer.create(<Initial />).toJSON();
        expect(render).toMatchSnapshot();
    })
    it('check function', () => {
        let loghand = renderer.create(<Initial />).getInstance();
        expect(loghand.componentDidMount()).toBeDefined();


        
    })
    
});

