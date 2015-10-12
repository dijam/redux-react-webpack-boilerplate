import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import contactStore from 'stores/index';
import { Provider } from 'react-redux';

const dest = document.getElementById('root');
const store = contactStore();

const component = (
    <Provider store={ store }>
      <App />
    </Provider>
);
ReactDOM.render(component, dest);

// If in dev mode, add DevTools to the dom obviously
if (__DEV__) {
  const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');

  window.document.title += ' - DevTools';

  ReactDOM.render(<div>
    {component}
    <DebugPanel top right bottom key='debugPanel'>
      <DevTools store={store} monitor={LogMonitor}/>
    </DebugPanel>
  </div>, dest);
}
