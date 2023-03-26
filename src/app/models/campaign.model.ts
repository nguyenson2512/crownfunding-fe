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

export interface IDocument {
  name: string;
  description: string;
  url: string;
}

export interface IMilestone {
  title: string;
  description: string;
  amount: number;
  estimateDeadline?: any;
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
  documents?: IDocument[] | any[];
  milestones?: IMilestone[];
  video?: string;
  constructor(data) {
    super();
    this.fill(data);
  }
}
