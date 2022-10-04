import { Privilage } from './entities/privilage.mysql.entity';


export const PrivilageProviders = [
  {
    provide: 'PRIVILAGE_DATABASE',
    useFactory: (DataBase) => DataBase.getRepository(Privilage),
    inject: ['MYSQL_DATA_SOURCE']
  }
]