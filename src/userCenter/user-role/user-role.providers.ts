import { Provider } from "@nestjs/common";
import { UserRole } from "./entities/user-role.mysql.entity";


export const UserRoleProviders = [
  {
    provide: 'USER_ROLE_REPOSITORY',
    useFactory: (AppDateSource) => {
      return AppDateSource.getRepository(UserRole)
    },
    inject: ['MYSQL_DATA_SOURCE']
  }
]