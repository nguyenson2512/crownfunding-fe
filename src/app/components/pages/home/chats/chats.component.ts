import { BaseComponent } from '#components/core/base/base.component';
import { Chat, ChatRoom } from '#models/chat.model';
import { User } from '#models/user.model';
import { AuthService } from '#services/auth.service';
import { ComponentService } from '#services/component.service';
import { ChatService } from '#services/http/chat.service';
import { UserService } from '#services/http/users.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent extends BaseComponent implements OnInit {
  currentUser;
  chats$: BehaviorSubject<Chat[]> = new BehaviorSubject<Chat[]>([]);
  newMessage: string;
  search: string;
  users: User[];
  searchCtrl = new FormControl('');
  filteredUsers: Observable<User[]>;

  constructor(
    componentService: ComponentService,
    public chatService: ChatService,
    private authService: AuthService,
    private userService: UserService
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.authService.isLogInUser();
    this.currentUser = this.authService.currentUser$.getValue();
    this.subscribeOnce(this.chatService.getAllChatRooms(), (res) =>
      this.chatService.setChatRooms(res)
    );
    this.subscribeOnce(this.userService.getListUser(), (res) => {
      this.users = res?.data;
      this.filteredUsers = this.searchCtrl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.users?.slice();
        })
      );
    });

    this.subscribeUntilDestroy(this.chatService.selectedChatRoom$, (value) => {
      if (value) {
        this.subscribeOnce(this.chatService.getAllChats(value?._id), (res) => {
          this.chats$.next(res?.chats);
        });
      }
    });
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.users.filter((user) =>
      user.name.toLowerCase().includes(filterValue)
    );
  }

  getReceiver(users: User[]) {
    const receiver = users.find((user) => user._id !== this.currentUser?._id);
    return receiver;
  }

  selectChatroom(chatRoom: ChatRoom) {
    if (
      !chatRoom ||
      chatRoom?._id === this.chatService.selectedChatRoomValue?._id
    ) {
      return;
    }
    this.chatService.setSelectedChatRoom(chatRoom);
  }

  handleChooseUser(user: User) {
    let existedRoom: any = false;
    for (let room of this.chatService.chatRoomsValue) {
      if (room.users.some((u) => u._id === user?._id)) {
        existedRoom = room;
        break;
      }
    }
    if (existedRoom) {
      this.selectChatroom(existedRoom);
      this.searchCtrl.setValue('');
    }
    this.subscribeOnce(
      this.chatService.createChatRoom([user?._id, this.currentUser?._id]),
      (res) => {
        this.chatService.setChatRooms([
          res,
          ...this.chatService.chatRoomsValue,
        ]);
        this.selectChatroom(res);
        this.searchCtrl.setValue('');
      }
    );
  }

  handleSendChat() {
    if (!this.chatService.selectedChatRoomValue || !this.newMessage) {
      return;
    }

    this.subscribeOnce(
      this.chatService.createChat(
        this.chatService.selectedChatRoomValue?._id,
        this.newMessage,
        this.getReceiver(this.chatService.selectedChatRoomValue.users)?._id
      ),
      (res) => {
        console.log(res);
        if (res) {
          this.chats$.next([...this.chats$.getValue(), res]);
          this.newMessage = '';
        }
      }
    );
  }
}
