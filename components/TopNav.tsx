import React, { FC } from 'react';

import TopNavigation from '@awsui/components-react/top-navigation';
import { useRouter } from 'next/router';

export type TopNavProps = {
  username: string;
  signout: (data?: Record<string | number | symbol, unknown> | undefined) => void;
};

const TopNav: FC<TopNavProps> = ({ username, signout }) => {
  const router = useRouter();

  const handleOnFollow = (e: CustomEvent) => {
    e.preventDefault();
    void router.push('/');
  };

  return (
    <TopNavigation
      identity={{
        href: '/',
        title: 'Amplify',
        logo: {
          src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTI2cHgiIGhlaWdodD0iOTRweCIgdmlld0JveD0iMCAwIDEyNiA5NCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTggKDg0NjYzKSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4KICAgIDx0aXRsZT5GaWxsLTE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9IjEwMCUiIHkxPSIyMi4xNzE4MzE3JSIgeDI9IjAlIiB5Mj0iNzcuODI4MTY4MyUiIGlkPSJsaW5lYXJHcmFkaWVudC0xIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0ZGOTkwMCIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRkZDMzAwIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTI3LjQxOTM2NDYsNzggTDYyLjkwOTM3OTYsNzggTDcyLDk0IEw3MS43NDM4OTIsOTQgTDAsOTQgTDI1LjI4MDg2MDQsNTAuMTkyMTM3IEwzNS44NzUxODI1LDMxLjg0NzMyODggTDQ0Ljk3MTAxMDMsNDcuNjA4NDI0NyBMMjcuNDE5MzY0Niw3OCBaIE00MC42NTU0MTE2LDIzLjU1MTI0OTMgTDQ5LjM4ODc1MjYsOC40MTg1MzY5OSBMOTguODE0NDY2LDkzLjk5OTc0MjUgTDgxLjMxMDg4NzksOTMuOTk5NzQyNSBMNDAuNjU1NDExNiwyMy41NTEyNDkzIFogTTU0LjI0OTYzNSwwIEw3MS43Mjk5MTA0LDAgTDEyNiw5NCBMMTA4LjQ5NzcxNiw5NCBMNTQuMjQ5NjM1LDAgWiIgaWQ9IkZpbGwtMSIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0xKSIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==',
          alt: 'Amplify',
        },
        onFollow: handleOnFollow,
      }}
      utilities={[
        {
          type: 'button',
          text: 'AWS',
          href: 'https://aws.amazon.com/',
          external: true,
          externalIconAriaLabel: ' (opens in a new tab)',
        },
        {
          type: 'menu-dropdown',
          text: `${username}`,
          iconName: 'user-profile',
          items: [{ id: 'signout', text: 'Sign out' }],
          onItemClick: ({ detail: { id } }) => {
            if (id === 'signout') {
              signout();
            }
          },
        },
      ]}
      i18nStrings={{
        searchIconAriaLabel: 'Search',
        searchDismissIconAriaLabel: 'Close search',
        overflowMenuTriggerText: 'More',
        overflowMenuTitleText: 'All',
        overflowMenuBackIconAriaLabel: 'Back',
        overflowMenuDismissIconAriaLabel: 'Close menu',
      }}
    />
  );
};

export default TopNav;
