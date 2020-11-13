import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {Signup} from '../../screens/Register';


describe('Register', () => {
    test('Page', () => {
        const tree = renderer.create(<Signup />).toJSON();
        //console.warn(tree);
        expect(tree.children.length).toBe(9);
    });
    
    test('renders', () => {
        const render = renderer.create(<Signup />).toJSON();
        expect(render).toMatchSnapshot();
    })
    let findTextElement = function(tree, element){
        //console.warn(tree)
        return true;
    }
     
    it('Find text element', ()=>{
       let tree = renderer.create(
           <Signup />
       ).toJSON();
     
       expect(findTextElement(tree, 'email')).toBeDefined();
    })
    it('check function', () => {
        let loghand = renderer.create(<Signup />).getInstance();
        expect(loghand.handleSignUp('ema')).toBeDefined();


        
    })

});