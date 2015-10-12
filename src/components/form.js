import React, { Component } from 'react';
import { fetchContacts, deleteContact, saveNewContact, toggleAddForm, saveUpdatedContact } from '../actions/index';
import { Modal, Button, Label } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

@connect((state, props) => {
  return {
    contacts: state.selectedContact.contacts || [],
    dispatch: state.selectedContact.dispatch,
    addFormVisiblity: state.selectedContact.addFormVisiblity || false,
    updateContact: state.selectedContact.updateContact || {},
  };
})
class AddForm extends Component {
  constructor(props) {
    super(props);
    this.updateMode = this.updateMode.bind(this);
  }

  /*
    Checks if the update flag is set
  */
  updateMode() {
    const { updateContact } = this.props;
    if (updateContact && Object.keys(updateContact).length > 0) {
      return true;
    }

    return false;
  }

  /*
    Method for distpathcing edited or created contact data
  */
  saveForm() {
    const { dispatch, updateContact } = this.props;
    var data = {
      'first_name': this._firstName.value,
      'last_name': this._lastName.value,
      location: this._location.value,
      color: this._color.value,
      team: this._team.value,
      title: this._title.value,
      image: 'http://ubwins.cse.buffalo.edu/wp-content/uploads/2014/08/default-user-profile.jpg',
    };

    if (this.updateMode()) {
      dispatch(saveUpdatedContact(Object.assign({}, data, {id: updateContact.id, image: updateContact.image})));
    } else {
      dispatch(saveNewContact(data));
    }
  }

  /*
    Toggle the visibility flag for the modal
  */
  close() {
    const { dispatch } = this.props;
    dispatch(toggleAddForm(true));
  }

  render() {
    const { updateContact } = this.props;
    var pageTitle = 'Add contact';

    // If it is in update mode, read data from props and prefill the form
    if (this.updateMode()) {
      pageTitle = 'Edit contact';
      var firstName = updateContact.first_name;
      var lastName = updateContact.last_name;
      var location = updateContact.location;
      var color = updateContact.color;
      var team = updateContact.team;
      var title = updateContact.title;
    }

    return (
        <Modal show={this.props.addFormVisiblity} onHide={() => this.close()}>
            <Modal.Header closeButton>
                <Modal.Title>{pageTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className='form-group'>
                  <label for='first-name' className='control-label'>First Name:</label>
                  <input id='first-name' className='form-control' defaultValue={firstName} type='text' ref={(c) => this._firstName = c} className='form-control' placeholder='' />
                </div>
                  <div className='form-group'>
                    <label for='last-name' className='control-label'>Last Name:</label>
                    <input id='last-name' className='form-control' defaultValue={lastName} type='text' ref={(c) => this._lastName = c} className='form-control' placeholder='' />
                  </div>
                  <div className='form-group'>
                    <label for='location' className='control-label'>Location:</label>
                    <input id='location' className='form-control' defaultValue={location} type='text' ref={(c) => this._location = c} className='form-control' placeholder='' />
                  </div>
                  <div className='form-group'>
                    <label for='title' className='control-label'>Title:</label>
                    <input id='title' className='form-control' defaultValue={title} type='text' ref={(c) => this._title = c} className='form-control' placeholder='' />
                  </div>
                  <div className='form-group'>
                    <label for='team' className='control-label'>Team:</label>
                    <input id='team' className='form-control' defaultValue={team} type='text' ref={(c) => this._team = c} className='form-control' placeholder='' />
                  </div>
                  <div className='form-group'>
                    <label for='color' className='control-label'>Color:</label>
                    <input id='color' className='form-control' defaultValue={color} type='text' ref={(c) => this._color = c} className='form-control' placeholder='' />
                  </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.close()}>Close</Button>
              <Button onClick={() => this.saveForm()}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
  }
}

export default AddForm;
