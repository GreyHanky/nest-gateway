import { In, Like, Raw, MongoRepository, Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './entities/user.mysql.entity';
import { FeishuUserInfo } from './feishu/feishu.dto';
import { UserRoleService } from '../user-role/user-role.service';
import { RoleService } from '../role/role.service';
import { UserListWithPaginationDto } from './dto/user.dto';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { isNotEmpty } from 'class-validator';
import { getPaginationOptions } from '@/helper';
import { RolePrivilegeService } from '../role-privilege/role-privilege.service';
import { PrivilageService } from '../privilege/privilege.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private readonly userRoleService: UserRoleService,
    private readonly roleService: RoleService,
    private readonly rolePrivilegeService: RolePrivilegeService,
    private readonly privilegeService: PrivilageService,
  ) { }

  createOrSave(user: User) {
    return this.userRepository.save(user);
  }

  async createOrUpdateByFeishu(feishuUserInfo: FeishuUserInfo) {
    let findUser: User
    try {
      findUser = await this.userRepository.findOne({
        where: [{ email: feishuUserInfo.email }],
      });
    } catch (error) {
      console.error(error)
    }

    return await this.userRepository.save({ ...findUser, ...feishuUserInfo });
  }

  profile(userId: number) {
    return this.userRepository.findOneBy({ id: userId })
  }



  async paginate(
    searchParams: UserListWithPaginationDto,
    page: PaginationParams,
  ): Promise<Pagination<User, CustomPaginationMeta>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.orderBy('user.updateTime', 'DESC');
    if (isNotEmpty(searchParams.keyword)) {
      queryBuilder.andWhere('user.name LIKE :name', {
        name: `%${searchParams.keyword}%`,
      });
      queryBuilder.orWhere('user.username LIKE :name', {
        name: `%${searchParams.keyword}%`,
      });
    }
    return paginate<User, CustomPaginationMeta>(
      queryBuilder,
      getPaginationOptions(page),
    );
  }

  getUserListByEmails(emailList: string[]) {
    return this.userRepository.find({
      where: {
        email: In(emailList),
      },
    });
  }

  // 获取用户权限列表
  async getPrivilegeListByUserId(userId: number, systemId: number) {
    const userRoleList = await this.userRoleService.listByUserId(userId, systemId);

    const roleIds = userRoleList.map(({ roleId }) => roleId);

    const rolePrivilegeList = await this.rolePrivilegeService.listByRoleIds(roleIds);

    const privilegeIds = rolePrivilegeList.map(({ privilegeId }) => privilegeId);

    const privilegeList = await this.privilegeService.findByIds(privilegeIds);

    return privilegeList;
  }

  async getPrivilegeCodesByUserId(userId: number, systemId: number) {
    const privilegeList = await this.getPrivilegeListByUserId(userId, systemId);

    return privilegeList.map(({ status, resourceKey, action }) => {
      return {
        code: `${resourceKey}-${action}`,
        status
      }
    })
  }
  // 获取用户角色列表
  async getRolesById(userId: number, systemId: number) {
    const userRoles = await this.userRoleService.listByUserId(userId, systemId);
    const roleIds = userRoles.map(ur => ur.roleId);
    return await this.roleService.findByIds(roleIds);
  }

  getUserById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  getUserByFeishuId(feishuUserId: string) {
    return this.userRepository.findOne({
      where: {
        feishuUserId
      }
    });
  }
}
