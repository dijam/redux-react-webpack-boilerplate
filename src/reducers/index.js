import fetch from 'isomorphic-fetch';

import { combineReducers } from 'redux';
import * as actions from '../actions/index';

function selectedContact(state = {}, action) {
  switch (action.type) {
  case actions.RECEIVE_CONTACTS:
    return Object.assign({}, state, {
      contacts: action.data,
      isFetching: false,
      didUpdated: false,
      lastUpdated: action.receivedAt,
    });

    // return {
    //   ...state,
    //   contacts: action.data,
    //   isFetching: false,
    //   didUpdated: false,
    //   lastUpdated: action.receivedAt,
    // };
  case actions.REQUEST_CONTACTS:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case actions.REQUEST_DELETE_CONTACT:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case actions.RESPONSE_DELETE_CONTACT:
    if (action.didUpdated) {
      state.contacts = state.contacts.filter(contact =>
        contact.id !== action.removedId
      );
    };

    return Object.assign({}, state, {
      isFetching: false,
      didUpdated: action.didUpdated,
      lastUpdated: action.receivedAt,
    });
  case actions.SHOW_ADD:
    return Object.assign({}, state, {
      addFormVisiblity: !action.value,
      updateContact: action.data,
    });
  case actions.SAVE_CONTACT_REQUEST:
    return Object.assign({}, state, {
      addFormVisiblity: false,
      newContact: action.data,
    });
  case actions.SAVE_CONTACT_DONE:
    return Object.assign({}, state, {
      contacts: [...state.contacts, action.data.data],
      didUpdated: true,
      lastUpdated: action.receivedAt,
    });
  case actions.SAVE_UPDATE_REQUEST:
    return Object.assign({}, state, {
      addFormVisiblity: false,
      isFetching: true,
    });
  case actions.INVALIDATE_CONTACTS:
    return Object.assign({}, state, {
      contacts: [],
    });
  case actions.SAVE_UPDATE_DONE:
    return Object.assign({}, state, {
      contacts: state.contacts.map(contact =>
          action.data.id === contact.id ?
            Object.assign({}, contact, action.data) :
            contact
      ),
      didUpdated: true,
      addFormVisiblity: false,
      isFetching: false,
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
