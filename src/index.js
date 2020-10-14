import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose,combineReducers } from 'redux'
import thunk from 'redux-thunk'
import auth from './store/AuthReducer'
import contacts from './store/ContactsReducer'
import rooms from './store/RoomsReducer'


const composeEnhancers = process.env.NODE_ENV ==='develpment'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose;


const compine=combineReducers({
  auth,
  contacts,
  rooms
})

const store = createStore(compine, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  
    <Provider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
