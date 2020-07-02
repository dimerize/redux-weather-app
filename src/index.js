import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import mainReducer from './Reducers';
import { createStore } from 'redux';
import { Provider }from 'react-redux';

let store = createStore(mainReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);