import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Commande } from './entities/commande.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('commandes')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}

  @Post()
  // @Roles('client')
  create(@Body() createCommandeDto: CreateCommandeDto) : Promise<Commande> {
    return this.commandesService.create(createCommandeDto);
  }

  @Get()
    // @Roles('client', 'producer')
  findAll(): Promise<Commande[]> {
    return this.commandesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<Commande> {
    return this.commandesService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommandeDto: UpdateCommandeDto) {
    return this.commandesService.update(id, updateCommandeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) : Promise<{message: string}> {
    return this.commandesService.remove(id);
  }
}
