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
    it('updateEmail_Empty', () => {
        expect(updateEmail().payload).toEqual();
    });
    it('updatePassword', () => {
        expect(updatePassword('sd').payload).toEqual('sd');
    });
    it('updatePassword_Empty', () => {
        expect(updatePassword().payload).toEqual();
    });
    it('updateConfirmPassword', () => {
        expect(updateConfirmPassword('sd').payload).toEqual('sd');
    });
    it('updateConfirmPassword_Empty', () => {
        expect(updateConfirmPassword('sd').payload).toEqual('sd');
    });
    it('updateName', () => {
        expect(updateName('sd').payload).toEqual('sd');
    });
    it('updateName_Empty', () => {
        expect(updateName().payload).toEqual();
    });
    it('fetchUserObj', () => {
        expect(fetchUserObj('sd').payload.userServer).toEqual('sd');
    });
    it('fetchUserObj_Empty', () => {
        expect(updateName().payload).toEqual();
    });
    it('fetchBearerToken', () => {
        expect(fetchBearerToken('sd').payload).toEqual('sd');
    });
    it('fetchUserObj_Empty', () => {
        expect(updateName().payload).toEqual();
    });
});