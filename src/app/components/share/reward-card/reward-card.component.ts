import { BaseComponent } from '#components/core/base/base.component';
import { IReward } from '#models/campaign.model';
import { ComponentService } from '#services/component.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reward-card',
  templateUrl: './reward-card.component.html',
  styleUrls: ['./reward-card.component.scss'],
})
export class RewardCardComponent extends BaseComponent implements OnInit {
  @Input() reward: IReward;
  @Input() isCanEdit: boolean = false;
  @Output() handleEdit = new EventEmitter();
  @Output() handleRemove = new EventEmitter();

  constructor(componentService: ComponentService) {
    super(componentService);
  }

  ngOnInit(): void {}

  showQuantityItem(item: { name: string; quantity: string }) {
    return +item.quantity !== 1;
  }

  get isNotDefaultReward() {
    return this.reward?.title !== 'Pledge without a reward';
  }

  onEdit() {
    this.handleEdit.emit(this.reward);
  }

  onRemove() {
    this.handleRemove.emit(this.reward);
  }
}
