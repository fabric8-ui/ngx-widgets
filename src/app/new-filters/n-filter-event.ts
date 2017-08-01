import { NewFilter } from './n-filter';
import { NewFilterField } from './n-filter-field';
import { NewFilterQuery } from './n-filter-query';

/*
 * A filter event containing:
 *
 * appliedFilters - List of the currently applied filters
 * field - A filterable field
 * query - A filterable query
 * value - The filter input field value
 */
export class NewFilterEvent {
  appliedFilters?: NewFilter[];
  field: NewFilterField;
  query: NewFilterQuery;
  value?: string;
}
