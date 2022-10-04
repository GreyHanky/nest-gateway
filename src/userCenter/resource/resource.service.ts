import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { isNotEmpty } from 'class-validator';
import { PaginationParams } from 'types/type';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CreateResourceDto, ResourceListWithPaginationDto } from './dto/resource.dto';
import { Resource } from './entities/resource.mysql.entity';
import { getPaginationOptions } from '../../helper/index';

@Injectable()
export class ResourceService {
  constructor(@Inject('RESOURCE_REPOSITORY') private resourceRepository: Repository<Resource>) { }

  create(resource: Resource) {
    return this.resourceRepository.save(resource);
  }

  findById(id: number) {
    return this.resourceRepository.findOne({
      where: { id }
    });
  }

  update(resource: Resource) {
    return this.resourceRepository.save(resource);
  }

  remove(id: number) {
    return this.resourceRepository.delete(id);
  }

  findByKey(key: string) {
    return this.resourceRepository.findOne({
      where: { key }
    })
  }

  async paginate(
    searchParams: ResourceListWithPaginationDto,
    page: PaginationParams
  ): Promise<Pagination<Resource, CustomPaginationMeta>> {
    const queryBuilder = this.resourceRepository.createQueryBuilder('resource');
    queryBuilder.orderBy('resource.createTime', 'DESC');

    // 关键字
    if (isNotEmpty(searchParams.keyword)) {
      queryBuilder.andWhere('resource.name LIKE :name', {
        name: `%${searchParams.keyword}%`,
      });
    }

    return paginate<Resource, CustomPaginationMeta>(
      queryBuilder,
      getPaginationOptions(page),
    );
  }

  listBySystemId(systemId: number) {
    return this.resourceRepository.find({
      where: {
        systemId
      }
    });
  }
}
