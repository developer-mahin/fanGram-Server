import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  search(searchableField: string[]) {
    if (this?.query?.search) {
      this.queryModel = this.queryModel.find({
        $or: searchableField.map(
          (field) =>
            ({
              [field]: { $regex: this?.query?.search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.queryModel = this.queryModel.skip(skip).limit(limit);
    return this;
  }

  priceRange() {
    const queryObj = { ...this.query } as { priceRange?: string };

    if (queryObj.priceRange) {
      const [minStr, maxStr] = queryObj.priceRange.split('-');

      const min = parseFloat(minStr);
      const max = parseFloat(maxStr);
      if (!isNaN(min) && !isNaN(max)) {
        this.queryModel = this.queryModel.find({
          price: {
            $gte: min,
            $lte: max,
          },
        });
      }
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludesField = [
      'search',
      'sort',
      'limit',
      'page',
      'fields',
      'priceRange',
    ];
    excludesField.forEach((ele) => delete queryObj[ele]);

    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);
    return this;
  }
  
  sort() {
    const sort = this?.query?.sort || '-createdAt';
    this.queryModel = this.queryModel.sort(sort as string);
    return this;
  }

  async countTotal() {
    const totalQueries = this.queryModel.getFilter();
    const total = await this.queryModel.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
