import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '#models/comment.model';
import { BaseComponent } from '#components/core/base/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentService } from '#services/component.service';
import { CampaignDetailService } from '#services/campaign-detail.service';
import { CampaignService } from '#services/http/campaign.service';
import { CommentType } from '#utils/const';
import { AuthService } from '#services/auth.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent extends BaseComponent implements OnInit {
  @Input() commentItem: Comment;
  @Input() campaignId: string;
  textValue: string = '';
  mainCommentId: number;
  replyForm: FormGroup = this.fb.group({
    reply: ['', [Validators.maxLength(255)]],
  });
  constructor(
    private componentService: ComponentService,
    private campaignDetailService: CampaignDetailService,
    private campaignService: CampaignService,
    private fb: FormBuilder,
    public authService: AuthService
  ) {
    super(componentService);
  }

  ngOnInit(): void {}

  textIsEmpty(event) {
    this.textValue = event;
  }

  toggleInput(commentId: number) {
    this.mainCommentId = commentId;
  }

  checkReply(commentId: number): boolean {
    return this.mainCommentId === commentId;
  }

  onReply(commentId: string) {
    this.subscribeOnce(
      this.campaignService.createComment(
        this.campaignId,
        this.replyForm.controls['reply'].value,
        CommentType.EVALUATE,
        commentId
      ),
      (res) => {
        if (res) {
          let commentItemIndex;
          let newCommentList = [];
          let commentItem = this.campaignDetailService.commentsValue.filter(
            (cmt, index) => {
              if (cmt._id === res?.parentId) {
                commentItemIndex = index;
                return true;
              } else return false;
            }
          );
          let newObjReply = Object.assign({}, res);
          let newCommentItem = {
            ...commentItem[0],
            replies: [...commentItem[0].replies, newObjReply],
          };
          newCommentList.push(newCommentItem);
          this.campaignDetailService.comments$.next([
            ...this.campaignDetailService.commentsValue.slice(
              0,
              commentItemIndex
            ),
            ...newCommentList,
            ...this.campaignDetailService.commentsValue.slice(
              commentItemIndex + 1,
              this.campaignDetailService.commentsValue.length
            ),
          ]);
          this.service.message.showMessage(
            this.trans('successMessage.addComment')
          );
        }
      }
    );

    this.replyForm.patchValue({ reply: null });
    this.mainCommentId = null;
  }

  resolveComment(commentId: string) {
    this.subscribeOnce(
      this.campaignService.resolveComment(commentId),
      (res) => {
        if (res) {
          this.service.message.showMessage('Resolve comment success');
          this.commentItem = new Comment({
            ...this.commentItem,
            isResolved: true,
          });
        }
      }
    );
  }
}
