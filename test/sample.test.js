import expect from 'expect';
import * as actions from '../src/actions/index';

describe('actions', () => {
  it('should create an action for invalidating contacts', () => {
    const expectedAction = {
      type: actions.INVALIDATE_CONTACTS,
    };

    expect(actions.invalidateContacts()).toEqual(expectedAction);
  });
});
