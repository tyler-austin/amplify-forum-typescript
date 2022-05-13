import React, { Suspense } from 'react';

import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { Authenticator } from '@aws-amplify/ui-react';
import AppLayout from '@awsui/components-react/app-layout';
import Box from '@awsui/components-react/box';
import { Amplify } from 'aws-amplify';
import { createAuthLink, AuthOptions } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import ErrorBoundary from '../components/ErrorBoundary';
import Loading from '../components/Loading';
import NotificationProvider from '../components/NotificationProvider';
import Notifications from '../components/Notifications';
import TopNav from '../components/TopNav';
import config from '../src/aws-exports';

// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import '@awsui/global-styles/index.css';
import '../styles/globals.css';

const NoSSR = dynamic(() => import('../components/NoSSR'), { suspense: true });

const StyledAuth = styled(Authenticator)`
  display: grid;
  margin: 10rem auto;
`;

Amplify.configure(config);
const url = config.aws_appsync_graphqlEndpoint;
const region = config.aws_appsync_region;
const httpLink = new HttpLink({ uri: url });

const App = ({ Component, pageProps }: AppProps) => {
  const pageContent = (
    <Box margin="xs" padding="xs">
      <Component {...pageProps} />
    </Box>
  );

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <NoSSR>
          <StyledAuth>
            {({ signOut, user }) => {
              console.log('user:', user);

              const auth: AuthOptions = {
                type: 'AMAZON_COGNITO_USER_POOLS',
                jwtToken: () => {
                  const signInUserSession = user.getSignInUserSession();
                  const accessToken = signInUserSession?.getAccessToken();
                  const jwtToken = accessToken?.getJwtToken() ?? '';
                  return jwtToken;
                }, // Required when you use Cognito UserPools
              };

              const link: ApolloLink = ApolloLink.from([
                createAuthLink({ url, region, auth }),
                createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
              ]);

              const client = new ApolloClient({
                link,
                cache: new InMemoryCache(),
              });

              return (
                <ApolloProvider client={client}>
                  <TopNav username={user.username ?? ''} signout={signOut} />
                  <NotificationProvider>
                    <AppLayout
                      content={pageContent}
                      contentType="default"
                      navigationHide={true}
                      toolsHide={true}
                      notifications={<Notifications />}
                    />
                  </NotificationProvider>
                </ApolloProvider>
              );
            }}
          </StyledAuth>
        </NoSSR>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
