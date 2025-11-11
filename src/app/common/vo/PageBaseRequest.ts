import {BaseRequest} from "./BaseRequest";

export interface PageBaseRequest extends BaseRequest {
  pageIndex: number;
  pageSize: number;
}
