import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Commande } from './entities/commande.entity';

@Controller('commandes')
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}

  @Post()
  create(@Body() createCommandeDto: CreateCommandeDto) : Promise<Commande> {
    return this.commandesService.create(createCommandeDto);
  }

  @Get()
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
