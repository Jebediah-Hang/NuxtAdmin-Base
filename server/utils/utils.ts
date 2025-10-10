import { createHash, randomUUID } from "node:crypto";
import { cloneDeep } from "lodash-es";
import jwt from "jsonwebtoken";
import type { User } from "~~/types/models/user";

export class Constant {
  static loginValidPeriod = 43200000;
}

export function delay(duration: number) {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
}

export function dateFormat(date: Date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const sizeValue = bytes / Math.pow(k, i);

  const integerDigits = Math.floor(sizeValue).toString().length;
  const decimals = Math.max(3 - integerDigits, 0);

  return `${sizeValue.toFixed(decimals)} ${sizes[i]}`;
}

export function separatePagerQuery(params: ApiPageQuery): [ApiPager, any] {
  const query: any = cloneDeep(params);
  const pager: ApiPager = {
    size: query.size ? Number(query.size) : 10,
    current: query.current ? Number(query.current) : 1
  };

  delete query.size;
  delete query.current;

  return [pager, query];
}

export function hashUserPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export function createJwtToken(user: Partial<User>, expiredTime: number): string {
  const { secretConfig } = useRuntimeConfig();
  const token = jwt.sign(
    { randomId: randomUUID(), ...user, expiredTime },
    secretConfig.jwtSignKey
  );
  return token;
}

export function verifyJwtToken(token?: string): string | jwt.JwtPayload {
  const { secretConfig } = useRuntimeConfig();
  if (!token) {
    throw createError("Unauthorized");
  }
  return jwt.verify(token, secretConfig.jwtSignKey);
}

export function deleteFromObject<T = any>(obj: T, deleteKeys: Array<keyof T>) {
  deleteKeys.forEach((k) => delete obj[k]);
}
