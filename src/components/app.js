import React from 'react'
import Contacts from './contacts'
import { Provider } from 'react-redux'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Provider>
            { () => <Contacts /> }
        </Provider>
      </div>
    )
  }
}


// store={ this.props.store }
// { () => <Contacts /> }
