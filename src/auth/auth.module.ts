import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Producteur } from 'src/producteur/entities/producteur.entity';
import { Clientinfo } from 'src/clientinfos/entities/clientinfo.entity';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from './roles.guard';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Producteur, Clientinfo]),
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     secret: config.get<string>('JWT_SECRET'),
    //     signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') },
    //   }),
    // }),
    // UsersModule,
  ],
  providers: [AuthService, JwtStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([User, Producteur, Clientinfo]),
//     // UsersModule,
//     JwtModule.register({
//       secret: 'SECRET_KEY', // à mettre dans .env
//       signOptions: { expiresIn: '1h' },
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService],
//   exports: [AuthService],
// })
// export class AuthModule {}
