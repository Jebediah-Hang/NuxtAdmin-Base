export interface PaginationPager {
  total: number;
  pageSize: number;
  currentPage: number;
}

export type TableColumnConfig<T = any> = Partial<Record<keyof TableCommonRowData<T>, string>>;
