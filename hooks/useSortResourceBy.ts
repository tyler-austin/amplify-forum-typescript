import { useState, useMemo } from 'react';

import { SelectProps } from '@awsui/components-react/select';

import { Topic, Comment } from '../types';
import { sortDates } from '../utils/sortDates';

type UseSortResourceByType = {
  options: SelectProps.Option[];
  order: SelectProps.Option;
  setOrder: (order: SelectProps.Option) => void;
  sortedResources: (Topic | Comment)[];
};

const useSortResourceBy = (resources: (Topic | Comment)[]): UseSortResourceByType => {
  const options = [
    { label: 'Highest votes first', value: 'highest' },
    { label: 'Lowest votes first', value: 'lowest' },
    { label: 'Oldest first', value: 'oldest' },
    { label: 'Newest first', value: 'newest' },
  ];

  const [order, setOrder] = useState<SelectProps.Option>(options[0]);

  const sortedResources = useMemo(() => {
    switch (order.value) {
      case 'highest':
        return [...resources].sort((a, b) => b.voteCount - a.voteCount);
      case 'lowest':
        return [...resources].sort((a, b) => a.voteCount - b.voteCount);
      case 'newest':
        return [...resources].sort((a, b) => sortDates(b.createdAt, a.createdAt));
      case 'oldest':
      default:
        return [...resources].sort((a, b) => sortDates(a.createdAt, b.createdAt));
    }
  }, [order.value, resources]);

  return { options, order, setOrder, sortedResources };
};

export default useSortResourceBy;
