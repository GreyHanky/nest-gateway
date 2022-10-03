import { System } from './entities/system.mysql.entity';


export const SystemProviders = [
  {
    provide: 'SYSTEM_DATABASE',
    useFactory: (DataBase) => DataBase.getRepository(System),
    inject: ['MYSQL_DATA_SOURCE']
  }
]