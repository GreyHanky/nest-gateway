import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto, RoleListWithPaginationDto } from './dto/role.dto';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.mysql.entity';
import { RolePrivilegeService } from '../role-privilege/role-privilege.service';
import { SystemService } from '../system/system.service';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { isNotEmpty } from 'class-validator';
import { getPaginationOptions } from '@/helper';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY') private roleRepository: Repository<Role>,
    private readonly rolePrivilegeService: RolePrivilegeService,
    // private readonly systemService: SystemService
  ) {

  }


  create(createRoleDto: CreateRoleDto) {
    const role: Role = {
      systemId: createRoleDto.systemId,
      name: createRoleDto.name,
      description: createRoleDto.description,
    }
    return this.roleRepository.save(role);
  }

  update(updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.save(updateRoleDto);
  }

  async remove(id: number) {
    await this.rolePrivilegeService.remove(id);
    return this.roleRepository.delete(id)
  }

  findById(id: number) {
    return this.roleRepository.findOneBy({ id })
  }

  findByIds(ids: number[]) {
    return this.roleRepository.find({
      where: {
        id: In(ids)
      }
    })
  }


  async list(systemId: number) {
    return this.roleRepository.find({
      where: {
        systemId
      }
    })
  }

  async paginate(
    searchParams: RoleListWithPaginationDto,
    page: PaginationParams,
  ): Promise<Pagination<Role, CustomPaginationMeta>> {
    const queryBuilder = this.roleRepository.createQueryBuilder('role');
    queryBuilder.orderBy('role.createTime', 'DESC');

    // 关键字
    if (isNotEmpty(searchParams.keyword)) {
      queryBuilder.andWhere('role.name LIKE :name', {
        name: `%${searchParams.keyword}%`,
      });
    }

    return paginate<Role, CustomPaginationMeta>(
      queryBuilder,
      getPaginationOptions(page),
    );
  }

}
