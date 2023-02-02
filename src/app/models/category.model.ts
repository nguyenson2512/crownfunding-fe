import { Model } from './model';

export class Category extends Model {
  name: string;
  parentId: string | null;
  isActive: boolean;
  subCategories?: Category[];
  createdAt?: Date;
  updatedAt?: Date;
  isParentActive: boolean;

  constructor(data = null) {
    super();
    if (data) {
      this.fill(data);
      this.isParentActive = true;
      this.subCategories =
        data.subCategories.length > 0
          ? data.subCategories.map((item) => {
              const child = new Category(item);
              child.isParentActive = data.isActive;
              return child;
            })
          : [];
    }
  }
}

export interface IProductCategoryRequestBody {
  parentId: string;
  name: string;
  isActive: boolean;
}
