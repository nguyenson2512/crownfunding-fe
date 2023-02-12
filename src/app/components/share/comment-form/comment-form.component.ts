import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent extends BaseComponent implements OnInit {
  @Output() comment = new EventEmitter<{ content: string; parentId: number }>();
  textValue: string = '';
  commentForm: FormGroup = this.fb.group({
    comment: ['', [Validators.maxLength(255)]],
  });
  constructor(
    private componentService: ComponentService,
    private fb: FormBuilder
  ) {
    super(componentService);
  }

  ngOnInit(): void {}

  textIsEmpty(event) {
    this.textValue = event;
  }

  onComment(): void {
    if (this.commentForm.valid) {
      this.comment.emit({
        content: this.commentForm.controls['comment'].value,
        parentId: null,
      });
      this.commentForm.patchValue({ comment: '' });
    }
  }
}
