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
