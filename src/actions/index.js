
export const REQUEST_CONTACTS = 'REQUEST_CONTACTS';
export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS';
export const FETCH_CONTACTS = 'FETCH_CONTACTS';
export const REQUEST_DELETE_CONTACT = 'REQUEST_DELETE_CONTACT';
export const RESPONSE_DELETE_CONTACT = 'RESPONSE_DELETE_CONTACT';
export const SHOW_ADD = 'SHOW_ADD';
export const SAVE_CONTACT_REQUEST = 'SAVE_CONTACT_REQUEST';
export const SAVE_CONTACT_DONE = 'SAVE_CONTACT_DONE';
export const SAVE_CONTACT_ERROR = 'SAVE_CONTACT_ERROR';
export const SAVE_UPDATE_REQUEST = 'SAVE_UPDATE_REQUEST';
export const SAVE_UPDATE_DONE = 'SAVE_UPDATE_DONE';
export const SAVE_UPDATE_ERROR = 'SAVE_UPDATE_ERROR';
export const INVALIDATE_CONTACTS = 'INVALIDATE_CONTACTS';

const serverUrl = 'http://127.0.0.1:5000';
/*
  When a contact is requested
*/
function requestContacts() {
  return {
    type: REQUEST_CONTACTS,
  };
}

/*
  When an update for a contact is requested
*/
function requestUpdateContact(contact) {
  return {
    type: SAVE_UPDATE_REQUEST,
    contact: contact,
  };
}

/*
  When response of an update has been received
*/
function responseUpdateContact(contact) {
  return {
    type: SAVE_UPDATE_DONE,
    didUpdated: true,
    data: contact.data,
    receivedAt: Date.now(),
  };
}

/*
  When delete of a contact is requested
*/
function requestDeleteContact(contact) {
  return {
    type: REQUEST_DELETE_CONTACT,
    contact: contact,
  };
}

/*
  When response of the delete has been received
*/
function responseDeleteContact(out) {
  return {
    type: RESPONSE_DELETE_CONTACT,
    didUpdated: out.updated,
    removedId: out.removedId,
    receivedAt: Date.now(),
  };
}

/*
  When fetched contacts has been received
*/
function receiveContacts(json) {
  return {
    type: RECEIVE_CONTACTS,
    data: json,
    receivedAt: Date.now(),
  };
}

/*
  When a new contact to be saved has been requested
*/
function requestSaveNewContact(data) {
  return {
    type: SAVE_CONTACT_REQUEST,
    data: data,
  };
}

/*
  When a new contact has been saved
*/
function responseSaveNewContact(data) {
  return {
    type: SAVE_CONTACT_DONE,
    data: data,
    receivedAt: Date.now(),
  };
}

/*
  When an error happened for saving a new contact
*/
function errorSaveNewContact(err) {
  return {
    type: SAVE_CONTACT_ERROR,
    error: err,
  };
}

/*
  Toggle contact form modal visibility
*/
export function toggleAddForm(value, data) {
  return {
    type: SHOW_ADD,
    value: value,
    data: data,
  };
}

/*
  Invaidates current contacts and empty state
*/
export function invalidateContacts() {
  return {
    type: INVALIDATE_CONTACTS,
  };
}

/*
  Checks if we got error back from calls
*/
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    console.log(response);
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

/*
  Fetches contacts with API and sends dispatches
*/
export function fetchContacts(props) {
  if (props.lastUpdated === 0 || props.didUpdated === true) {
    return dispatch => {
      dispatch(requestContacts());
      let hashcache = Date.now();
      return fetch(`${serverUrl}/contacts?${hashcache}`)
        .then(checkStatus)
        .then(response => response.json())
        .then(json => dispatch(receiveContacts(json)));
    };
  }

  return dispatch => {dispatch(receiveContacts(props.contacts));};
}

/*
  Delete a contact with API and sends dispatches
*/
export function deleteContact(id) {
  return dispatch => {
    dispatch(requestDeleteContact(id));
    return fetch(`${serverUrl}/contacts/${id}`, {method: 'delete'})
      .then(checkStatus)
      .then(dispatch(responseDeleteContact({updated: true, removedId: id})));
  };
}

/*
  Save the new contact and sends dispatches
*/
export function saveNewContact(data) {
  return dispatch => {
    dispatch(requestSaveNewContact(data));
    return fetch(`${serverUrl}/contacts`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(checkStatus)
    .then(response => response.json())
    .then(json => dispatch(responseSaveNewContact({
      data: json,
    })));
  };
}

/*
  Save the updated contact and sends dispatches
*/
export function saveUpdatedContact(data) {
  return dispatch => {
    dispatch(requestUpdateContact(data));
    return fetch(`http://127.0.0.1:5000/contacts/${data.id}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then(checkStatus)
    .then(response => response.json())
    .then(json => dispatch(responseUpdateContact({
      data: json
    })));
  };
}
