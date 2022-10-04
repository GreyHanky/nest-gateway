import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Privilage } from './entities/privilage.mysql.entity';

@Injectable()
export class PrivilageService {

  constructor(@Inject('PRIVILAGE_DATABASE') private privilageRepository: Repository<Privilage>) { }


  create(createPrivilageDto: Privilage) {
    return this.privilageRepository.save(createPrivilageDto);
  }

  findAll() {
    return this.privilageRepository.find();
  }

  findOne(id: number) {
    return this.privilageRepository.findOne({
      where: { id }
    });
  }


  findByIds(ids: number[]) {
    return this.privilageRepository.find({
      where: {
        id: In(ids)
      }
    })
  }

  update(updatePrivilageDto: Privilage) {
    return this.privilageRepository.save(updatePrivilageDto);
  }

  remove(id: number) {
    return this.privilageRepository.delete(id);
  }
}
