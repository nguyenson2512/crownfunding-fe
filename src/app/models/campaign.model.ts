import { CampaignStatus } from '#utils/const';
import { Model } from './model';
import { User } from './user.model';

export interface IReward {
  title: string;
  amount: string;
  description: string;
  currency: string;
  itemsOffering: string;
}

//TODO: LINK MODEL
export class Campaign extends Model {
  title: string;
  subTitle: string;
  location: string;
  story: string;
  risk: string;
  fundingGoal: number;
  currency: string;
  targetLunchDate: Date;
  duration: Date;
  image: string;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
  rewards: IReward[];
  status: CampaignStatus;
  constructor(data) {
    super();
    this.fill(data);
  }
}
