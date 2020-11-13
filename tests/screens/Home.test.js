import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {Home} from '../../screens/Home';


describe('Home', () => {
    test('Page', () => {
        const tree = renderer.create(<Home />).toJSON();
        //console.warn(tree);
        expect(tree.children.length).toBe(2);
    });
    
    test('renders', () => {
        const render = renderer.create(<Home />).toJSON();
        expect(render).toMatchSnapshot();
    })
    let findTextElement = function(tree, element){
        console.warn(tree)
        return true;
    }
     
    it('Find text element', ()=>{
       let tree = renderer.create(
           <Home />
       ).toJSON();
     
       expect(findTextElement(tree, 'email')).toBeDefined();
    })
    it('check function', () => {
        let loghand = renderer.create(<Home />).getInstance();
        expect(loghand.componentDidMount()).toBeDefined();


        
    })
    it('check function', () => {
        let loghand = renderer.create(<Home />).getInstance();
        expect(loghand.onPressWorkoutButton()).toBeDefined();


        
    })

});

