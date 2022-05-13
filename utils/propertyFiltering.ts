import { UseCollectionOptions } from '@awsui/collection-hooks';
import { FilteringProperty } from '@awsui/collection-hooks/dist/cjs/interfaces';
import { PropertyFilterProps } from '@awsui/components-react/property-filter';
import { isBoolean, isNumber, isUndefined, lowerCase, keys, some } from 'lodash';
import { DateTime } from 'luxon';

type Query = PropertyFilterProps.Query;
type Operator = PropertyFilterProps.ComparisonOperator;
type Token = PropertyFilterProps.Token;

type FilteringPropertiesMap<T> = {
  [key in keyof T]: {
    operators: {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      [key in Operator]?: true;
    };
  };
};

export const filteringFunction = <T>(
  item: T,
  { tokens, operation }: Query,
  filteringProperties: FilteringProperty[],
) => {
  const filteringPropertiesMap = getFilteringPropertiesMap(filteringProperties);
  let result = operation === 'and' ? true : !tokens.length;
  for (const token of tokens) {
    result =
      operation === 'and'
        ? result && filterByToken(token, item, filteringPropertiesMap)
        : result || filterByToken(token, item, filteringPropertiesMap);
  }
  return result;
};

const getFilteringPropertiesMap = <T>(filteringProperties: FilteringProperty[]) => {
  return filteringProperties.reduce<FilteringPropertiesMap<T>>(
    (
      acc: FilteringPropertiesMap<T>,
      {
        key,
        operators,
        defaultOperator,
      }: NonNullable<UseCollectionOptions<T>['propertyFiltering']>['filteringProperties'][0],
    ) => {
      const operatorSet: { [key: string]: true } = { [defaultOperator ?? '=']: true };
      operators?.forEach((op) => (operatorSet[op] = true));
      acc[key as keyof T] = {
        operators: operatorSet,
      };
      return acc;
    },
    {} as FilteringPropertiesMap<T>,
  );
};

const filterByToken = <T>(
  { propertyKey, value, operator }: Token,
  item: T,
  filteringPropertiesMap: FilteringPropertiesMap<T>,
) => {
  if (!isUndefined(propertyKey)) {
    if (
      !(propertyKey in filteringPropertiesMap) ||
      !(operator in filteringPropertiesMap[propertyKey as keyof FilteringPropertiesMap<T>].operators)
    ) {
      return false;
    }
    console.log('item:', item);
    console.log('propertyKey:', propertyKey);
    const itemValue: unknown = fixupFalsyValues(item[propertyKey as keyof T]);
    console.log('itemValue:', itemValue);
    return filterUsingOperator(itemValue, value, operator);
  }
  return freeTextFilter(value, item, operator, filteringPropertiesMap);
};

const filterUsingOperator = (
  itemValue: string | number | DateTime | unknown,
  tokenValue: string | number | DateTime,
  operator: Operator,
) => {
  switch (operator) {
    case '<':
      return (itemValue as string | number) < tokenValue;
    case '<=':
      return (itemValue as string | number) <= tokenValue;
    case '>':
      return (itemValue as string | number) > tokenValue;
    case '>=':
      return (itemValue as string | number) >= tokenValue;
    case '=':
      // eslint-disable-next-line eqeqeq
      return itemValue == tokenValue;
    case '!=':
      // eslint-disable-next-line eqeqeq
      return itemValue != tokenValue;
    case ':':
      return lowerCase(`${itemValue}`).indexOf(lowerCase(`${tokenValue}`)) > -1;
    case '!:':
      return lowerCase(`${itemValue}`).indexOf(lowerCase(`${tokenValue}`)) === -1;
  }
};

const freeTextFilter = <T>(
  value: string,
  item: T,
  operator: Operator,
  filteringPropertiesMap: FilteringPropertiesMap<T>,
): boolean => {
  const matches = some(keys(filteringPropertiesMap), (propertyKey) => {
    const { operators } = filteringPropertiesMap[propertyKey as keyof typeof filteringPropertiesMap];
    return !!operators[operator] && filterUsingOperator(item[propertyKey as keyof typeof item], value, ':');
  });
  return operator === ':' ? matches : !matches;
};

export const fixupFalsyValues = <T>(value: T): T | string => {
  if (isBoolean(value)) {
    return `${value}`;
  }
  if (!isUndefined(value) || (isNumber(value) && value === 0)) {
    return value;
  }
  return '';
};
