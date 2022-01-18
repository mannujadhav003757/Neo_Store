import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'font-awesome/css/font-awesome.min.css';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
// import {rootReducer} from "./Services/Reducers/index"
//import rootReducer from './Services/Reducers/index.js'
import rootReducer from './service/reducers/index'
const store = createStore(rootReducer)
console.warn('store data',store)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();
