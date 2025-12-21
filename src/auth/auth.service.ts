// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Clientinfo } from 'src/clientinfos/entities/clientinfo.entity';
import { Producteur } from 'src/producteur/entities/producteur.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { InscriptionDto, UserRole } from './dto/inscription.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Producteur)
    private readonly producteurRepo: Repository<Producteur>,

    @InjectRepository(Clientinfo)
    private readonly clientInfoRepo: Repository<Clientinfo>,

    private readonly jwtService: JwtService,
  ) {}

//   async validateUser(email: string, password: string): Promise<User> {
//     const user = await this.userRepository.findOne({ where: { email } });
//     if (!user) throw new UnauthorizedException('Utilisateur non trouvé');
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) throw new UnauthorizedException('Mot de passe incorrect');
//     return user;
//   }

//   async login(user: User) {
//     const payload = { sub: user.id, email: user.email, role: user.role };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }

//   async register(userData: Partial<User>) {
//     const hashedPassword = await bcrypt.hash(userData.password, 10);
//     const user = await this.usersService.create({ ...userData, password: hashedPassword });
//     return user;
//   }
// async register(dto: InscriptionDto) {
//   const hashedPassword = await bcrypt.hash(dto.password, 10);

//   const user = this.userRepository.create({
//     name: dto.name,
//     email: dto.email,
//     phone: dto.phone,
//     role: dto.role,
//     password: hashedPassword,
//   });

//   await this.userRepository.save(user);

//   // 🔹 Création du profil selon le rôle
//   if (dto.role === UserRole.PRODUCER && dto.producteurInfo) {
//     const producteur = this.producteurRepo.create({
//       ...dto.producteurInfo,
//       user,
//     });
//     await this.producteurRepo.save(producteur);
//   }

//   if (dto.role === UserRole.CLIENT && dto.clientInfo) {
//     const client = this.clientInfoRepo.create({
//       ...dto.clientInfo,
//       user,
//     });
//     await this.clientInfoRepo.save(client);
//   }

//   return {
//     message: 'Inscription réussie',
//     userId: user.id,
//     role: user.role,
//   };
// }

 async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    return user;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /* ---------------- REGISTER ---------------- */

  async register(dto: InscriptionDto) {
    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 👤 Create user
    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      role: dto.role,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    // 🌱 Producer profile
    if (dto.role === UserRole.PRODUCER && dto.producteurInfo) {
      const producteur = this.producteurRepo.create({
        zone: dto.producteurInfo.zone,
        superficie: dto.producteurInfo.surfaceHa,
        typeExploitation: dto.producteurInfo.farmName,
        user,
      });
      await this.producteurRepo.save(producteur);
    }

    // 🧑‍🍳 Client profile
    if (dto.role === UserRole.CLIENT && dto.clientInfo) {
      const client = this.clientInfoRepo.create({
        clientType: dto.clientInfo.type,
        adresse: dto.clientInfo.address,
        user,
      });
      await this.clientInfoRepo.save(client);
    }

    return {
      message: 'Inscription réussie',
      userId: user.id,
      role: user.role,
    };
  }

}
