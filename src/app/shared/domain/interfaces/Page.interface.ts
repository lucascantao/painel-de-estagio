export interface Page<T> {
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
  items: T[];
}
