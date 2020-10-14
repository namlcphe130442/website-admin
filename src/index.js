import React from 'react';
import ReactDOM from 'react-dom';
import {Auth0Provider} from '@auth0/auth0-react';
import {createStore} from 'redux';
import { Provider } from 'react-redux';

// import './index.css';
import App from './App';
import { myReducer } from './reducers/index';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const store = createStore(  
  myReducer
);

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <Provider store={ store }>
      <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById('root')
);
