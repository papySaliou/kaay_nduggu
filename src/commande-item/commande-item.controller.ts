import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandeItemService } from './commande-item.service';
import { CreateCommandeItemDto } from './dto/create-commande-item.dto';

@Controller('commande-item')
export class CommandeItemController {
  constructor(private readonly commandeItemService: CommandeItemService) {}

   @Post()
  create(@Body() dto: CreateCommandeItemDto) {
    return this.commandeItemService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandeItemService.remove(id);
  }
}
