import type * as Models from "~~/types/common";

declare global {
  type ApiResponse<T = any> = Models.ResponseResult<T>;
  // type AR =
}

declare module "#auth-utils" {
  interface User {
    id: string;
    name: string;
  }

  interface UserSession {
    // expiredTime: string;
  }

  interface SecureSessionData {}
}

export {};
