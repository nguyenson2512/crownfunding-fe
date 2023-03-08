import { Chat, ChatRoom } from '#models/chat.model';
import { DataClientService, DataSet } from '#services/http-client.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chatRooms$: BehaviorSubject<ChatRoom[]> = new BehaviorSubject<ChatRoom[]>([]);
  selectedChatRoom$: BehaviorSubject<ChatRoom> = new BehaviorSubject<ChatRoom>(
    null
  );

  get chatRoomsValue() {
    return this.chatRooms$.getValue();
  }

  get selectedChatRoomValue() {
    return this.selectedChatRoom$.getValue();
  }

  setChatRooms(chatRooms) {
    this.chatRooms$.next(chatRooms);
  }

  setSelectedChatRoom(chatRoom) {
    this.selectedChatRoom$.next(chatRoom);
  }

  constructor(private dataClientService: DataClientService) {}

  getAllChatRooms(): Observable<ChatRoom[]> {
    return this.dataClientService.get('/chatroom').pipe(
      pluck('result', 'data'),
      map((data: DataSet[]) => {
        return data.map((item) => new ChatRoom(item));
      })
    );
  }

  createChatRoom(users: string[]): Observable<ChatRoom> {
    return this.dataClientService
      .post('/chatroom', { users })
      .pipe(pluck('result', 'data'));
  }

  // getChatRoom(): Observable<ChatRoom> {
  //   return this.dataClientService.post('/chatroom/detail').pipe(
  //     pluck('result', 'data'),
  //   );
  // }

  getAllChats(chatroomId: string): Observable<ChatRoom> {
    return this.dataClientService
      .get(`/chatroom/${chatroomId}/chats`)
      .pipe(pluck('result', 'data'));
  }

  createChat(
    chatroomId: string,
    content: string,
    receiverId: string
  ): Observable<Chat> {
    return this.dataClientService
      .post(`/chatroom/${chatroomId}/chats`, { content, receiverId })
      .pipe(
        pluck('result', 'data'),
        map((res: DataSet) => new Chat(res))
      );
  }
}
