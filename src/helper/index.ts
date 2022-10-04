import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IPaginationOptions, IPaginationMeta } from 'nestjs-typeorm-paginate';
import { defaultPaginationParams, MAX_PAGE_SIZE } from './constants';

export const PayloadUser = createParamDecorator(
  (data, ctx: ExecutionContext): Payload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export class CustomPaginationMeta {
  constructor(
    public readonly pageSize: number,
    public readonly totalCounts: number,
    public readonly totalPages: number,
    public readonly currentPage: number,
  ) { }
}

export const getPaginationOptions = (
  page: PaginationParams = {
    currentPage: defaultPaginationParams.currentPage,
    pageSize: defaultPaginationParams.pageSize,
  },
) => {
  const limit = page.pageSize > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : page.pageSize;

  const options: IPaginationOptions<CustomPaginationMeta> = {
    page: page.currentPage,
    limit,
    metaTransformer: (meta: IPaginationMeta): CustomPaginationMeta => {
      return new CustomPaginationMeta(
        meta.itemCount,
        meta.totalItems,
        meta.totalPages,
        meta.currentPage,
      );
    },
  };
  return options;
};