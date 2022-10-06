import { DataSource, DataSourceOptions } from 'typeorm';
import { getConfig } from 'src/utils/index';
import * as path from 'path';
import { UserRole } from '@/userCenter/user-role/entities/user-role.mysql.entity';
import { System } from '@/userCenter/system/entities/system.mysql.entity';
import { Resource } from '@/userCenter/resource/entities/resource.mysql.entity';
import { Privilege } from '@/userCenter/privilege/entities/privilege.mysql.entity';
import { RolePrivilege } from '@/userCenter/role-privilege/entities/role-privilege.mysql.entity';
import { Role } from '../../userCenter/role/entities/role.mysql.entity';
import { User } from '../../userCenter/user/entities/user.mysql.entity';
import { NamingStrategy } from './naming.strategies';

// 设置数据库类型
const { MONGODB_CONFIG, MYSQL_CONFIG } = getConfig();

const MONGODB_DATABASE_CONFIG = {
  ...MONGODB_CONFIG,
  NamedNodeMap: new NamingStrategy(),
  entities: [
    path.join(
      __dirname,
      `../../**/*.${MONGODB_CONFIG.entities}.entity{.ts,.js}`,
    ),
  ],
};

const MYSQL_DATABASE_CONFIG = {
  ...MYSQL_CONFIG,
  NamedNodeMap: new NamingStrategy(),
  entities: [User, UserRole, System, Resource, Privilege, RolePrivilege, Role]
}

const MONGODB_DATA_SOURCE = new DataSource(MONGODB_DATABASE_CONFIG);
const MYSQL_DATA_SOURCE = new DataSource(MYSQL_DATABASE_CONFIG);

// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'MONGODB_DATA_SOURCE',
    useFactory: async () => {
      if (!MONGODB_DATA_SOURCE.isInitialized) await MONGODB_DATA_SOURCE.initialize();
      return MONGODB_DATA_SOURCE;
    },
  }, {
    provide: 'MYSQL_DATA_SOURCE',
    useFactory: async () => {
      if (!MYSQL_DATA_SOURCE.isInitialized) await MYSQL_DATA_SOURCE.initialize();
      return MYSQL_DATA_SOURCE;
    },
  }
];
