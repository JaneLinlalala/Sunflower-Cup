export interface TableListItem {
  id:string;
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  projectName: string;
  title: string;
  owner: string;
  studentName: string;
  competitionType: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListDate {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter: string;
  status: string;
  name: string;
  pageSize: number;
  currentPage: number;
}

export interface TableListId {
  id:string;
}