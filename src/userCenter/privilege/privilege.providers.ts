import { Privilege } from './entities/privilege.mysql.entity';


export const PrivilageProviders = [
  {
    provide: 'PRIVILAGE_DATABASE',
    useFactory: (DataBase) => DataBase.getRepository(Privilege),
    inject: ['MYSQL_DATA_SOURCE']
  }
]