import { NewFilterField } from './n-filter-field';
import { NewFilterQuery } from './n-filter-query';

/*
 * A filter containing:
 *
 * field - A filterable field
 * query - A filterable query
 * value - Filter value
 */
export class NewFilter {
  field: NewFilterField;
  query: NewFilterQuery;
  value: string;
}
