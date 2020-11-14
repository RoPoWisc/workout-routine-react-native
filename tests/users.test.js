import React from 'react';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store';

import {
    updateEmail, updatePassword, 
    updateConfirmPassword,updateName,
    fetchUserObj,fetchBearerToken
} from '../actions/user';


describe('Users.js TESTS', () => {
    it('updateEmail', () => {
        expect(updateEmail('sd').payload).toEqual('sd');
    });
    it('updatePassword', () => {
        expect(updatePassword('sd').payload).toEqual('sd');
    });
    it('updateConfirmPassword', () => {
        expect(updateConfirmPassword('sd').payload).toEqual('sd');
    });
    it('updateName', () => {
        expect(updateName('sd').payload).toEqual('sd');
    });
    it('fetchUserObj', () => {
        expect(fetchUserObj('sd').payload.userServer).toEqual('sd');
    });
    it('fetchBearerToken', () => {
        expect(fetchBearerToken('sd').payload).toEqual('sd');
    });
});