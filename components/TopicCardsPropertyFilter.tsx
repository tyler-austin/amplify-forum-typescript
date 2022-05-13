import React, { FC } from 'react';

import { UseCollectionResult } from '@awsui/collection-hooks';
import PropertyFilter, { PropertyFilterProps } from '@awsui/components-react/property-filter';

import { Topic } from '../types';

type TopicCardsPropertyFilterProps = {
  propertyFilterProps: UseCollectionResult<Topic>['propertyFilterProps'];
  filteringOptions: readonly PropertyFilterProps.FilteringOption[];
  countText: string;
};

const TopicCardsPropertyFilter: FC<TopicCardsPropertyFilterProps> = ({
  propertyFilterProps,
  filteringOptions,
  countText,
}) => {
  return (
    <PropertyFilter
      i18nStrings={{
        filteringAriaLabel: 'your choice',
        dismissAriaLabel: 'Dismiss',

        filteringPlaceholder: 'Search by device name, location, or region',
        groupValuesText: 'Values',
        groupPropertiesText: 'Properties',
        operatorsText: 'Operators',

        operationAndText: 'and',
        operationOrText: 'or',

        operatorLessText: 'Less than',
        operatorLessOrEqualText: 'Less than or equal',
        operatorGreaterText: 'Greater than',
        operatorGreaterOrEqualText: 'Greater than or equal',
        operatorContainsText: 'Contains',
        operatorDoesNotContainText: 'Does not contain',
        operatorEqualsText: 'Equals',
        operatorDoesNotEqualText: 'Does not equal',

        editTokenHeader: 'Edit filter',
        propertyText: 'Property',
        operatorText: 'Operator',
        valueText: 'Value',
        cancelActionText: 'Cancel',
        applyActionText: 'Apply',
        allPropertiesLabel: 'All properties',

        tokenLimitShowMore: 'Show more',
        tokenLimitShowFewer: 'Show fewer',
        clearFiltersText: 'Clear filters',
        removeTokenButtonAriaLabel: () => 'Remove token',
        enteredTextLabel: (text) => `Use: "${text}"`,
      }}
      {...propertyFilterProps}
      filteringOptions={filteringOptions}
      virtualScroll
      countText={countText}
    />
  );
};

export default TopicCardsPropertyFilter;
