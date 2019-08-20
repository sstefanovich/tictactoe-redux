import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux'
import Game from './game';
import rootReducer from './reducers';
import './index.css';

const store = compose(window.devToolsExtension ? 
    window.devToolsExtension() : f => f)(createStore)(rootReducer)

ReactDOM.render(
  <Provider store={store}><Game /></Provider>,
  document.getElementById('root')
);

