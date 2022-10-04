import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { PrivilegeListWithPaginationDto } from './dto/privilage.dto';
import { Privilage } from './entities/privilage.mysql.entity';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { isNotEmpty } from 'class-validator';
import { getPaginationOptions } from '@/helper';

@Injectable()
export class PrivilageService {

  constructor(@Inject('PRIVILAGE_DATABASE') private privilageRepository: Repository<Privilage>) { }


  create(createPrivilageDto: Privilage) {
    return this.privilageRepository.save(createPrivilageDto);
  }

  list(systemId: number) {
    return this.privilageRepository.find({
      where: {
        systemId
      }
    });
  }

  findByid(id: number) {
    return this.privilageRepository.findOne({
      where: { id }
    });
  }


  findByIds(ids: number[]) {
    return this.privilageRepository.find({
      where: {
        id: In(ids)
      }
    })
  }

  update(updatePrivilageDto: Privilage) {
    return this.privilageRepository.save(updatePrivilageDto);
  }

  remove(id: number) {
    return this.privilageRepository.delete(id);
  }

  async paginate(
    searchParams: PrivilegeListWithPaginationDto,
    page: PaginationParams,
  ): Promise<Pagination<Privilage, CustomPaginationMeta>> {
    const queryBuilder = this.privilageRepository.createQueryBuilder('privilege');
    queryBuilder.orderBy('privilege.createTime', 'DESC');

    // 关键字
    if (isNotEmpty(searchParams.keyword)) {
      queryBuilder.andWhere('privilege.name LIKE :name', {
        name: `%${searchParams.keyword}%`,
      });
    }

    return paginate<Privilage, CustomPaginationMeta>(
      queryBuilder,
      getPaginationOptions(page),
    );
  }
}
