import React from 'react';

import { Amplify } from 'aws-amplify';
import { AppProps } from 'next/app';

import config from '../src/aws-exports';

// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import '../styles/globals.css';

Amplify.configure(config);

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
