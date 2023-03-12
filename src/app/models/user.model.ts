import { Model } from './model';

export interface IRoleUser {
  _id: number;
  name: string;
}

export class User extends Model {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  roles: IRoleUser[];
  phone?: string;
  isVerifyEmail?: boolean;
  constructor(data) {
    super();
    this.fill(data);
  }
}

export class LoginUserData extends Model {
  accessToken: string;
  user: User;
  constructor(data) {
    super();
    this.user = data?.user;
    this.accessToken = data?.accessToken;
  }
}

export interface LoginUserRequestBody {
  username: string;
  password: string;
}
