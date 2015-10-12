import fetch from 'isomorphic-fetch';

import { combineReducers } from 'redux';
import * as actions from '../actions/index';

function selectedContact(state = {}, action) {
  switch (action.type) {
  case actions.RECEIVE_CONTACTS:
    return {
      ...state,
      contacts: action.data,
      isFetching: false,
      didUpdated: false,
      lastUpdated: action.receivedAt,
    };
  case actions.REQUEST_CONTACTS:
    return {
      ...state,
      isFetching: true,
    };
  case actions.REQUEST_DELETE_CONTACT:
    return {
      ...state,
      isFetching: true,
    };
  case actions.RESPONSE_DELETE_CONTACT:
    if (action.didUpdated) {
      state.contacts = state.contacts.filter(contact =>
        contact.id !== action.removedId
      );
    }

    return {
      ...state,
      isFetching: false,
      didUpdated: action.didUpdated,
      lastUpdated: action.receivedAt,
    };
  case actions.SHOW_ADD:
    return {
      ...state,
      addFormVisiblity: !action.value,
      updateContact: action.data
    };
  case actions.SAVE_CONTACT_REQUEST:
    return {
      ...state,
      addFormVisiblity: false,
      newContact: action.data,
    };
  case actions.SAVE_CONTACT_DONE:
    return Object.assign({}, state, {
      contacts: [...state.contacts, action.data.data],
      didUpdated: true,
      lastUpdated: action.receivedAt,
    });
  default:
    return state;
  };
};

const rootReducer = combineReducers({
  selectedContact,
});

export default rootReducer;
