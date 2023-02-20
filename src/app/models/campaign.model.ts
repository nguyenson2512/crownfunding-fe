import { CampaignStatus } from '#utils/const';
import { Model } from './model';
import { User } from './user.model';

export interface IReward {
  _id?: string;
  title: string;
  amount: number;
  description: string;
  currency: string;
  itemsOffering?: any;
  estimatedDelivery: string;
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
  targetLaunchDate: Date;
  duration: Date;
  image: string;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
  rewards: IReward[] | any;
  status: CampaignStatus;
  category: any;
  constructor(data) {
    super();
    this.fill(data);
  }
}
