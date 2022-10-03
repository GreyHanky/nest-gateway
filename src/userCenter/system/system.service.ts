import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { System } from './entities/system.mysql.entity';

@Injectable()
export class SystemService {

  constructor(@Inject('SYSTEM_DATABASE') private systemRepository: Repository<System>) { }

  create(createSystemDto: System) {
    return this.systemRepository.save(createSystemDto);
  }

  findAll() {
    return this.systemRepository.find();
  }

  findOne(id: number) {
    return this.systemRepository.findOne({
      where: { id }
    });
  }


  findByIds(ids: number[]) {
    return this.systemRepository.find({
      where: {
        id: In(ids)
      }
    })
  }

  update(updateSystemDto: System) {
    return this.systemRepository.save(updateSystemDto);
  }

  remove(id: number) {
    return this.systemRepository.delete(id);
  }

}
