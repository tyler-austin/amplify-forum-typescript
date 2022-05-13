import React, { FC } from 'react';

import Alert from '@awsui/components-react/alert';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';

const ErrorFallback: FC<FallbackProps> = ({ error }) => {
  console.error('ErrorBoundary Fallback:', error);
  return (
    <Alert type="error" header="Oops...Something went wrong.">
      Please refresh the page to try again.
      <pre>{error.message}</pre>
    </Alert>
  );
};

const ErrorBoundary: FC = ({ children }) => {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>;
};

export default ErrorBoundary;
