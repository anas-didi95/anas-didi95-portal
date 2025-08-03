// Type
export type TColor =
  | "primary"
  | "info"
  | "link"
  | "success"
  | "warning"
  | "danger";
export type TAlignment = "left" | "centered" | "justified" | "right";

// Interface
export interface IErrorResponse {
  isRetry: boolean;
  message: string;
}

export interface ISignInForm {
  username: string;
  password: string;
}

export interface ITokenInfo {
  _user: {
    name: string;
    lastSigninDate: string;
  };
}

export interface ITableData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resultList: any[];
  pagination?: IPagination;
}

export interface IPagination {
  pageNo: number;
  totalRecords: number;
  totalRecordsPerPage: number;
}
