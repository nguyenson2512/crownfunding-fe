import { CommentType } from '#utils/const';
import { Model } from './model';
import { User } from './user.model';

//TODO: update
export class Comment extends Model {
  content: string;
  createdBy: User;
  type: CommentType;
  parentId: string;
  replies: Comment[];
  isResolved: boolean;
  constructor(data) {
    super();
    this.fill(data);
  }
}
