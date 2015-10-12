import 'babel-core/polyfill';
import React, {Component, PropTypes} from 'react';
import Contacts from './contacts';
import AddForm from './form';
import { Button, Panel, Alert, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchContacts, toggleAddForm } from '../actions/index';

@connect((state, props) => {
  return {
    contacts: state.selectedContact.contacts || [],
    isFetching: state.selectedContact.isFetching || false,
    lastUpdated: state.selectedContact.lastUpdated || 0,
    didUpdated: state.selectedContact.didUpdated || false,
    dispatch: state.selectedContact.dispatch,
    addFormVisiblity: state.selectedContact.addFormVisiblity || false,
  };
})
export default class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchContacts(this.props));
  }

  /*
    Show contact modal form with sending dispatch signal
  */
  showAddForm() {
    const { dispatch, addFormVisiblity } = this.props;
    dispatch(toggleAddForm(addFormVisiblity));
  }

  render() {
    const { contacts, isFetching, addFormVisiblity, addButtonText, isError } = this.props;

    return (
      <div className='row-fluid'>
        <div className='col-md-12'>
            <div className='row'>
                <div className='col-md-12'>
                    <Button bsStyle='primary' bsSize='large' onClick={() => this.showAddForm(addFormVisiblity)}>Add new</Button>
                    <AddForm />
                    <br />
                    <br />
                </div>
            </div>
        </div>
        {contacts.length === 0 &&
            <div className='row-fluid'>
                <div className='col-md-12'>
                    {isFetching &&
                      <Alert bsStyle='info' role='alert'>Loading</Alert>
                    }
                    {!isFetching &&
                      <Alert bsStyle='info' role='warning'>Empty!</Alert>
                    }
                </div>
            </div>
        }
        {!isFetching && contacts.length > 0 &&
            <div className='row-fluid'>
                <div className='col-md-12'>
                    <Panel header='Contacts'>
                        <Table hover>
                            <thead>
                              <tr>
                                  <th>Picture</th>
                                  <th>First Name</th>
                                  <th>Full Name</th>
                                  <th>Location</th>
                                  <th>Team</th>
                                  <th>Title</th>
                                  <th>Color</th>
                                  <th>Actions</th>
                              </tr>
                            </thead>
                            <Contacts contacts={ contacts }/>
                        </Table>
                    </Panel>
                </div>
            </div>
        }
      </div>
    );
  }
}
