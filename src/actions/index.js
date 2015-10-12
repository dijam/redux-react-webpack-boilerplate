
export const REQUEST_CONTACTS = 'REQUEST_CONTACTS';
export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS';
export const FETCH_CONTACTS = 'FETCH_CONTACTS';
export const REQUEST_DELETE_CONTACT = 'REQUEST_DELETE_CONTACT';
export const RESPONSE_DELETE_CONTACT = 'RESPONSE_DELETE_CONTACT';
export const SHOW_ADD = 'SHOW_ADD';
export const SAVE_CONTACT_REQUEST = 'SAVE_CONTACT_REQUEST';
export const SAVE_CONTACT_DONE = 'SAVE_CONTACT_DONE';
export const SAVE_CONTACT_ERROR = 'SAVE_CONTACT_ERROR';
// export const SHOW_UPDATE = 'SHOW_UPDATE';
export const SAVE_UPDATE_REQUEST = 'SAVE_UPDATE_REQUEST';
export const SAVE_UPDATE_DONE = 'SAVE_UPDATE_DONE';
export const SAVE_UPDATE_ERROR = 'SAVE_UPDATE_ERROR';

function requestContacts() {
  return {
    type: REQUEST_CONTACTS,
  };
}

function requestUpdateContact(contact) {
  return {
    type: SAVE_UPDATE_REQUEST,
    contact: contact,
  };
}

function responseUpdateContact(contact) {
  return {
    type: SAVE_UPDATE_DONE,
    didUpdated: out.updated,
    updatedId: out.updatedId,
    receivedAt: Date.now(),
  };
}

function requestDeleteContact(contact) {
  return {
    type: REQUEST_DELETE_CONTACT,
    contact: contact,
  };
}

function responseDeleteContact(out) {
  return {
    type: RESPONSE_DELETE_CONTACT,
    didUpdated: out.updated,
    removedId: out.removedId,
    receivedAt: Date.now(),
  };
}

function receiveContacts(json) {
  return {
    type: RECEIVE_CONTACTS,
    data: json,
    receivedAt: Date.now(),
  };
}

function requestSaveNewContact(data) {
  return {
    type: SAVE_CONTACT_REQUEST,
    data: data,
  };
}

function responseSaveNewContact(data) {
  return {
    type: SAVE_CONTACT_DONE,
    data: data,
    receivedAt: Date.now(),
  };
}

function errorSaveNewContact(err) {
  return {
    type: SAVE_CONTACT_ERROR,
    error: err,
  };
}

export function toggleAddForm(value, data) {
  return {
    type: SHOW_ADD,
    value: value,
    data: data,
  };
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    console.log(response);
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function fetchContacts(props) {
  if (props.lastUpdated === 0 || props.didUpdated === true) {
    return dispatch => {
      dispatch(requestContacts());
      let hashcache = Date.now();
      return fetch(`http://127.0.0.1:5000/contacts?${hashcache}`)
        .then(checkStatus)
        .then(response => response.json())
        .then(json => dispatch(receiveContacts(json)));
    };
  }

  return dispatch => {dispatch(receiveContacts(props.contacts));};
}

export function deleteContact(id) {
  return dispatch => {
    dispatch(requestDeleteContact(id));
    return fetch(`http://127.0.0.1:5000/contacts/${id}`, {method: 'delete'})
      .then(checkStatus)
      .then(dispatch(responseDeleteContact({updated: true, removedId: id})));
    //   .then(dispatch(fetchContacts({didUpdated: true})));
  };
}

export function saveNewContact(data) {
  return dispatch => {
    dispatch(requestSaveNewContact(data));
    return fetch(`http://127.0.0.1:5000/contacts`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
  }).then(checkStatus)
  .then(response => response.json())
  .then(json => dispatch(responseSaveNewContact({
      data: json,
  })));
  // .then(dispatch(fetchContacts({didUpdated: true})));
  };
}

export function saveUpdatedContact(data) {
  console.log('Edit', data);
  debugger;
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
      data: json,
  })));
  // .then(dispatch(fetchContacts({didUpdated: true})));
  };
}
