import React, { FC } from 'react';

import BreadcrumbGroup, { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import { useRouter } from 'next/router';

export type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbGroupProps.Item[];
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  const router = useRouter();

  return (
    <BreadcrumbGroup
      items={breadcrumbs}
      onFollow={(e) => {
        e.preventDefault();
        void router.push(e.detail.href);
      }}
    />
  );
};

export default Breadcrumbs;
