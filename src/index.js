import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import { ApolloProvider } from 'react-apollo';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { BrowserRouter as Router } from 'react-router-dom';
import config from './aws-exports';
import './index.css';
import { App } from './components/App';
import * as serviceWorker from './serviceWorker';

Amplify.configure(config);

const client = new AWSAppSyncClient({
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  auth: {
    type: config.aws_appsync_apiKey,
    apiKey: config.aws_appsync_authenticationType
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router basename={process.env.PUBLIC_URL}>
      <Rehydrated>
        <App />
      </Rehydrated>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
