import { Model } from './model';

export class Notification extends Model {
  title: string;
  content: string;
  object: string;
  isRead: boolean;
  objectId: string;
  userId: string;
  constructor(data) {
    super();
    this.fill(data);
  }
}
