import { Inject, Injectable } from '@nestjs/common';
import { RolePrivilege } from './entities/role-privilege.mysql.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RolePrivilegeService {

  constructor(
    @Inject('ROLE_PRIVILEGE_REPOSITORY')
    private rolePrivilegeRepository: Repository<RolePrivilege>
  ) { }

  set(roleId: number, privilegeIds: number[], systemId: number) {
    const rolePrivileges: RolePrivilege[] = privilegeIds.map(privilegeId => {
      return {
        roleId,
        systemId,
        privilegeId
      }
    })

    return this.rolePrivilegeRepository.save(rolePrivileges)
  }

  listByRoleIds(roleIds: number[]) {
    return this.rolePrivilegeRepository.find({
      where: {
        roleId: In(roleIds)
      }
    });
  }

  remove(roleId: number) {
    return this.rolePrivilegeRepository.delete({ roleId });
  }
}
