import * as Models from "../types/common";

declare global {
  type ApiResponse<T = any> = Models.ResponseResult<T>;
}

export {};
