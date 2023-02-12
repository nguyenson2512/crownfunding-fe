import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '#models/comment.model';

@Component({
  selector: 'app-reply-item',
  templateUrl: './reply-item.component.html',
  styleUrls: ['./reply-item.component.scss'],
})
export class ReplyItemComponent extends BaseComponent implements OnInit {
  @Input() replyItem: Comment;
  constructor(private componentService: ComponentService) {
    super(componentService);
  }

  ngOnInit(): void {}
}
