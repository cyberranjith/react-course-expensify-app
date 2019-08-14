import React from 'react';
import { shallow } from 'enzyme';
import ConfirmationModal from '../../components/ConfirmationModal';

let wrapper, performConfirmedAction, closeConfirmation;

beforeEach ( () => {
    performConfirmedAction = jest.fn();
    closeConfirmation = jest.fn();
    wrapper = shallow(
        <ConfirmationModal
            showModal={true}
            confirmationText="Are you sure want to remove this expense?"
            performConfirmedAction={performConfirmedAction}
            closeConfirmation={closeConfirmation}
        />
    );
});

test('should render Confirmation Modal correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should perform the confirmed action on clicking Yes', () => {
    // Click the Yes button
    wrapper.find('button').at(0).simulate('click');
    expect(performConfirmedAction).toBeCalled();
});

test('should call close confirmation on clicking No', () => {
    // Click the No button
    wrapper.find('button').at(1).simulate('click');
    expect(closeConfirmation).toBeCalled();
});