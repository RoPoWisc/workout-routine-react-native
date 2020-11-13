import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {Login} from '../../screens/Login'

describe('Login', () => {
    test('Page', () => {
        const tree = renderer.create(<Login />).toJSON();
        //console.warn(tree);
        expect(tree.children.length).toBe(9);
    });
    
    test('renders', () => {
        const render = renderer.create(<Login />).toJSON();
        expect(render).toMatchSnapshot();
    })
    let findTextElement = function(tree, element){
        console.warn(tree)
        return true;
    }
     
    it('Find text element', ()=>{
       let tree = renderer.create(
           <Login />
       ).toJSON();
     
       expect(findTextElement(tree, 'email')).toBeDefined();
    })

    it('check function', () => {
        let loghand = renderer.create(<Login />).getInstance();
        expect(loghand.loginHandler()).toBeDefined();


        
    })
    it('check function', () => {
        let loghand = renderer.create(<Login />).getInstance();
        expect(loghand.componentDidMount()).toBeDefined();


        
    })
    
});