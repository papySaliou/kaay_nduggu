import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Clientinfo } from 'src/clientinfos/entities/clientinfo.entity';
import { Producteur } from 'src/producteur/entities/producteur.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    @InjectRepository(Producteur)
    private prodRepo: Repository<Producteur>,
    @InjectRepository(Clientinfo)
    private clientRepo: Repository<Clientinfo>,
  ) {}
  
    async findAll(role?: UserRole): Promise<User[]> {
    if (role) {
      return this.usersRepo.find({ where: { role }, relations: ['producteurInfo', 'clientInfo'] });
    }
    return this.usersRepo.find({ relations: ['producteurInfo', 'clientInfo'] });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepo.findOne({ 
      where: { id: id as string }, 
      relations: ['producteurInfo', 'clientInfo', 'products', 'commandes'] });
    if (!user) throw new NotFoundException('Utilisateur non trouvé');
    return user;
  }
  async findByEmail(email: string): Promise<User> {
  const user = await this.usersRepo.findOne({ 
    where: { email }, 
    relations: ['producteurInfo', 'clientInfo', 'products', 'commandes']
  });
  if (!user) throw new NotFoundException('Utilisateur non trouvé');
  return user;
}

async create(data: Partial<User>): Promise<User> {
  const user = this.usersRepo.create(data);
  return this.usersRepo.save(user);
}


  // Met à jour les infos user
  async update(id: string, data: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, data);
    return this.usersRepo.save(user);
  }

  // Supprime un user (cascade sur infos)
  async remove(id: string) {
    const user = await this.findOne(id);
    return this.usersRepo.remove(user);
  }
}
