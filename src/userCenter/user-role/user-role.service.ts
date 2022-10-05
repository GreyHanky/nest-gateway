import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.mysql.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject('USER_ROLE_REPOSITORY')
    private userRoleRepository: Repository<UserRole>
  ) { }

  listByUserId(userId: number, systemId: number) {
    return this.userRoleRepository.find({
      where: { userId, systemId }
    })
  }

  deleteByUserId(userId: number, systemId: number) {
   return this.userRoleRepository.delete({ userId, systemId })
  }

  async setUserRoles(userId: number, systemId: number, roleIds: number[]) {
    const userRoles: UserRole[] = roleIds.map(roleId => {
      return {
        userId,
        systemId,
        roleId
      }
    })
    // 要先把原来的权限删掉，否则就越加越多了
    await this.deleteByUserId(userId, systemId);

    return await this.userRoleRepository.save(userRoles);
  }
}
