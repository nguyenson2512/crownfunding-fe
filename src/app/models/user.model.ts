import { Model } from './model';

export class User extends Model {
  name: string;
  email?: string;
}
