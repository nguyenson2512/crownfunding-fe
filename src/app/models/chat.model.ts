import { CommentType } from '#utils/const';
import { Model } from './model';
import { User } from './user.model';

export class Chat extends Model {
  content: string;
  user: User;
  like?: boolean;
  chatRoomId: string;
  constructor(data) {
    super();
    this.fill(data);
  }
}

export class ChatRoom extends Model {
  chats: Chat[];
  users: User[];
  lastMessage: Chat;
  constructor(data) {
    super();
    this.fill(data);
  }
}
