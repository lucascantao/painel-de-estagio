import { Page } from "./Page.interface";

export interface ApiResponse<T> {
  status: string;
  data: Page<T>;
  metadata?: any;
  message?: string;
}
