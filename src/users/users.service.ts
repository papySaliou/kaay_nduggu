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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.usersRepo.save(user);
  }

  async remove(id: string): Promise<{ message: string }> {
    const user = await this.findOne(id);
    await this.usersRepo.remove(user);
    return { message: `Utilisateur avec l'ID ${id} supprimé.` };
  }


  async create(createUserDto: CreateUserDto): Promise<User> {
  const { role, clientInfo, producteurInfo, ...userData } = createUserDto;

  const user = this.usersRepo.create({ ...userData, role });

  if (role === UserRole.CLIENT && clientInfo) {
    const client = this.clientRepo.create({
      clientType: clientInfo.type,
      adresse: clientInfo.address,
      user: user, // ✅ OBLIGATOIRE
    });

    user.clientInfo = client;
  }

  if (role === UserRole.PRODUCER && producteurInfo) {
    const producteur = this.prodRepo.create({
      ...producteurInfo,
      user: user,
    });

    user.producteurInfo = producteur;
  }

  return this.usersRepo.save(user);
}


//   async create(createUserDto: CreateUserDto): Promise<User> {
//   const { role, ...userData } = createUserDto;
//   const user = this.usersRepo.create({ ...userData, role });

//   if (role === UserRole.PRODUCER && createUserDto.producteurInfo) {
//     const producteur = this.prodRepo.create(createUserDto.producteurInfo);
//     user.producteurInfo = producteur;
//   } else if (role === UserRole.CLIENT && createUserDto.clientInfo) {
//     const clientinfo = this.clientRepo.create(createUserDto.clientInfo);
//     user.clientInfo = clientinfo;
//   }

//   return this.usersRepo.save(user);
// }
// ...existing code...

// async create(createUserDto: CreateUserDto): Promise<User> {
//   const { role, producteurInfo, clientInfo, ...userData } = createUserDto;
//   const user = this.usersRepo.create({ ...userData, role }); // Only direct User properties

//   if (role === UserRole.PRODUCER && producteurInfo) {
//     const producteur = this.prodRepo.create(producteurInfo);
//     user.producteurInfo = producteur; // Assign as single object
//   } else if (role === UserRole.CLIENT && clientInfo) {
//     const clientinfo = this.clientRepo.create(clientInfo);
//     user.clientInfo = clientinfo; // Assign as single object
// }
//   return this.usersRepo.save(user);
// }

}

