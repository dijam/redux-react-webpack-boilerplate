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
  // constructor(props) {
  //   super(props);
  //
  //   // this.handleChange = this.handleChange.bind(this);
  //   // this.handleRefreshClick = this.handleRefreshClick.bind(this);
  // }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchContacts(this.props));
  }

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



// App.propTypes = {
//   contacts: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   lastUpdated: PropTypes.number,
//   dispatch: PropTypes.func.isRequired,
// };

// function mapStateToProps(state) {
//   const { selectedContact } = state;

  // console.log(this);
  // const {
  //   contacts,
  //   isFetching,
  //   lastUpdated,
  //   dispatch,
  // } = { selectedContact };

  // console.log('contents', state);

  // console.log('statestate', state);
//   // console.log(this);
//   // debugger;
//   return {
//     contacts: state.selectedContact.contacts || [],
//     isFetching: state.selectedContact.isFetching || false,
//     lastUpdated: state.selectedContact.lastUpdated || 0,
//     dispatch: state.selectedContact.dispatch,
//   };
// }

// export default connect(mapStateToProps)(App);
