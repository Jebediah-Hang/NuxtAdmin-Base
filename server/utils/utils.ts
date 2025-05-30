import { createHash, randomUUID } from 'node:crypto';
import jwt from 'jsonwebtoken';
import { cloneDeep } from 'lodash-es';
import type { User } from '@/types/models/user';

const { secretConfig } = useRuntimeConfig();

export function dateFormat(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
  return createHash('sha256').update(password).digest('hex');
}

export function createJwtToken(user: User): string {
  const token = jwt.sign({ username: user.username, random: randomUUID() }, secretConfig.jwtSignKey);
  return token;
}

export function verifyJwtToken(token?: string): string | jwt.JwtPayload {
  if (!token) {
    throw createError('Unauthorized');
  }
  return jwt.verify(token, secretConfig.jwtSignKey);
}
