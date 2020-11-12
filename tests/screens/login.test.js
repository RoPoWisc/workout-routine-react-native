import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {Login} from '../../screens/Login'

describe('Login', () => {
    test('Page', () => {
        const tree = renderer.create(<Login />).toJSON();
        expect(tree.children.length).toBe(9);
    });
});