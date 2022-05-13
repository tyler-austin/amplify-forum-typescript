import React, { FC, useState } from 'react';

import { ApolloError } from '@apollo/client';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useCollection } from '@awsui/collection-hooks';
import Alert from '@awsui/components-react/alert';
import Button from '@awsui/components-react/button';
import Cards from '@awsui/components-react/cards';
import CollectionPreferences, { CollectionPreferencesProps } from '@awsui/components-react/collection-preferences';
import { DateRangePickerProps } from '@awsui/components-react/date-range-picker';
import Grid from '@awsui/components-react/grid';
import Pagination from '@awsui/components-react/pagination';
import Select from '@awsui/components-react/select';
import SpaceBetween from '@awsui/components-react/space-between';
import { isNull, isUndefined } from 'lodash';
import { useRouter } from 'next/router';

import useSortResourceBy from '../hooks/useSortResourceBy';
import { Topic } from '../types';
import { dateRangeFilter } from '../utils/dateRangeFilter';
import { filteringFunction } from '../utils/propertyFiltering';
import DateRange from './DateRange';
import { CardsHeader, CardsEmptyState, CardsNoMatchState } from './TopicCardsCommon';
import {
  CARD_DEFINITIONS,
  PAGE_SIZE_OPTIONS,
  DEFAULT_PREFERENCES,
  FILTERING_PROPERTIES,
  getFilteringOptions,
} from './TopicCardsConfig';
import TopicCardsPropertyFilter from './TopicCardsPropertyFilter';
import TopicDeleteModal from './TopicDeleteModal';
import TopicModal from './TopicModal';

type TopicCardsProps = {
  loading: boolean;
  topics: Topic[];
  error?: ApolloError;
};

const TopicCards: FC<TopicCardsProps> = ({ loading, topics, error }) => {
  const router = useRouter();
  const { user } = useAuthenticator((context) => [context.user]);

  const { options, order, setOrder, sortedResources: sortedTopics } = useSortResourceBy(topics);
  const [preferences, setPreferences] = useState<CollectionPreferencesProps.Preferences>(DEFAULT_PREFERENCES);
  const [dateRange, setDateRange] = useState<DateRangePickerProps.Value | null>(null);

  const filteringOptions = getFilteringOptions(topics);

  const { items, actions, collectionProps, propertyFilterProps, filteredItemsCount, paginationProps } = useCollection(
    sortedTopics as Topic[],
    {
      propertyFiltering: {
        filteringProperties: FILTERING_PROPERTIES,
        filteringFunction: (item, query) => {
          return (
            filteringFunction(item, query, FILTERING_PROPERTIES) &&
            (!isNull(dateRange) ? dateRangeFilter(dateRange, item.createdAt) : true)
          );
        },
        empty: <CardsEmptyState />,
        noMatch: <CardsNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences.pageSize },
      selection: {},
    },
  );
  const { selectedItems = [] } = collectionProps;

  const isTopicOwner = user?.username === selectedItems[0]?.owner;

  if (!isUndefined(error)) {
    console.error('ListTopicsQuery error:', error);
  }

  console.log('Card items:', items);
  console.log('Date range:', dateRange);

  return !isUndefined(error) ? (
    <Alert visible={!!error} type="error" header="Error querying topics">
      {error}
    </Alert>
  ) : (
    <Cards
      {...collectionProps}
      cardsPerRow={[{ cards: 1 }, { minWidth: 1150, cards: 2 }]}
      stickyHeader={true}
      cardDefinition={CARD_DEFINITIONS}
      visibleSections={preferences.visibleContent}
      loading={loading}
      loadingText="Loading topics"
      items={items}
      selectionType="single"
      variant="full-page"
      header={
        <CardsHeader
          variant="awsui-h1-sticky"
          title="Topics"
          counter={`(${items.length})`}
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button
                disabled={selectedItems.length === 0}
                onClick={() => {
                  const topic = selectedItems[0];
                  void router.push({
                    pathname: '/topic/[id]',
                    query: { id: topic.id },
                  });
                }}
              >
                View
              </Button>
              <TopicDeleteModal disabled={!isTopicOwner || selectedItems.length === 0} selectedItems={selectedItems} />
              <TopicModal />
            </SpaceBetween>
          }
        />
      }
      filter={
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xxs: 12, xs: 12, s: 5, m: 5, l: 5, xl: 3 } },
            { colspan: { default: 12, xxs: 12, xs: 8, s: 4, m: 4, l: 3, xl: 3 } },
            { colspan: { default: 12, xxs: 12, xs: 8, s: 3, m: 3, l: 3, xl: 3 } },
          ]}
        >
          <TopicCardsPropertyFilter
            filteringOptions={filteringOptions}
            propertyFilterProps={propertyFilterProps}
            countText={`${filteredItemsCount} ${filteredItemsCount === 1 ? 'match' : 'matches'}`}
          />
          <DateRange value={dateRange} onChange={setDateRange} />
          <Select
            selectedOption={order}
            onChange={({ detail: { selectedOption } }) => setOrder(selectedOption)}
            options={options}
            selectedAriaLabel="Selected"
          />
        </Grid>
      }
      pagination={
        <Pagination
          {...paginationProps}
          ariaLabels={{
            nextPageLabel: 'Next page',
            previousPageLabel: 'Previous page',
            pageLabel: (pageNumber: number) => `Page ${pageNumber} of all pages`,
          }}
          disabled={loading}
        />
      }
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          disabled={loading}
          preferences={preferences}
          onConfirm={({ detail }) => setPreferences(detail)}
          pageSizePreference={{
            title: 'Page size',
            options: PAGE_SIZE_OPTIONS,
          }}
        />
      }
    />
  );
};

export default TopicCards;
