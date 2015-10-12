import React, { Component } from 'react';
import { fetchContacts, deleteContact, toggleAddForm } from '../actions/index';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

@connect((state, props) => {
  return {
    contacts: state.selectedContact.contacts || [],
    isFetching: state.selectedContact.isFetching || false,
    lastUpdated: state.selectedContact.lastUpdated || 0,
    didUpdated: state.selectedContact.didUpdated || false,
    dispatch: state.selectedContact.dispatch,
  };
})
export default class Contacts extends Component {
  constructor(props) {
    super(props);
    this.deleteSelectedContact = this.deleteSelectedContact.bind(this);
  }

  /*
    Sends dispatch signal for deleteing the given contact id
  */
  deleteSelectedContact(id) {
    const { dispatch } = this.props;
    dispatch(deleteContact(id, this.props));
  }

  /*
    Shows edit modal form
  */
  showEditForm(contact) {
    const { dispatch } = this.props;
    dispatch(toggleAddForm(false, contact));
  }

  render() {
    const {contacts} = this.props;
    return (
      <tbody>
        {this.props.contacts.map((contact, i) =>
          <tr key={i}>
            <td>
              <img src={contact.image} alt={contact.first_name} className='img-circle' />
            </td>
            <td>{ contact.first_name }</td>
            <td>{ contact.last_name }</td>
            <td>{ contact.location }</td>
            <td>{ contact.team }</td>
            <td>{ contact.title }</td>
            <td style={{backgroundColor: `#${contact.color}`}}> </td>
            <td>
              <Button onClick={() => this.showEditForm(contact)}>Edit</Button>
              <Button onClick={() => this.deleteSelectedContact(contact.id)}>Remove</Button>
            </td>
          </tr>
        )}
      </tbody>
    );
  }
}
