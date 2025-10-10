export interface User {
  id: number;
  username: string;
  password: string;
  nickname?: string;
  phone?: string;
  email?: string;
  enable: number;
}
