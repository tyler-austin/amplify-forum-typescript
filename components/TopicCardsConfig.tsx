import React from 'react';

import { FilteringProperty } from '@awsui/collection-hooks/dist/cjs/interfaces';
import { CardsProps } from '@awsui/components-react/cards';
import { PropertyFilterProps } from '@awsui/components-react/property-filter';
import { map, uniqBy } from 'lodash';
import Link from 'next/link';

import { Topic } from '../types';
import TopicCard from './TopicCard';

export const CARD_DEFINITIONS: CardsProps.CardDefinition<Topic> = {
  header: (item: Topic) => (
    <div>
      <Link href={`/topic/${item.id}`}>
        <a>{item.title}</a>
      </Link>
    </div>
  ),
  sections: [
    {
      id: 'main',
      header: '',
      content: (item: Topic) => <TopicCard topic={item} />,
    },
  ],
};

export const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10 Topics' },
  { value: 30, label: '30 Topics' },
  { value: 50, label: '50 Topics' },
];

export const DEFAULT_PREFERENCES = {
  pageSize: 30,
  visibleContent: ['main'],
};

export const FILTERING_PROPERTIES: FilteringProperty[] = [
  {
    propertyLabel: 'Title',
    key: 'title',
    groupValuesLabel: 'Titles',
    operators: [':', '!:', '=', '!='],
  },
  {
    propertyLabel: 'Comments',
    key: 'commentCount',
    groupValuesLabel: 'Comments',
    operators: ['<', '<=', '>', '>=', ':', '!:', '=', '!='],
  },
  {
    propertyLabel: 'Owner',
    key: 'owner',
    groupValuesLabel: 'Owners',
    operators: [':', '!:', '=', '!='],
  },
];

export const getFilteringOptions = (topics: Topic[]): PropertyFilterProps.FilteringOption[] => [
  ...uniqBy(
    map(topics ?? [], (topic) => ({
      propertyKey: 'title',
      value: topic.title,
    })),
    'value',
  ),
  ...uniqBy(
    map(topics ?? [], (topic) => ({
      propertyKey: 'commentCount',
      value: `${topic.commentCount}`,
    })),
    'value',
  ),
  ...uniqBy(
    map(topics ?? [], (topic) => ({
      propertyKey: 'owner',
      value: topic.owner,
    })),
    'value',
  ),
];
