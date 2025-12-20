import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientinfosService } from './clientinfos.service';
import { CreateClientinfoDto } from './dto/create-clientinfo.dto';
import { UpdateClientinfoDto } from './dto/update-clientinfo.dto';
import { Clientinfo } from './entities/clientinfo.entity';

@Controller('clientinfos')
export class ClientinfosController {
  constructor(private readonly clientinfosService: ClientinfosService) {}
 @Post()
  create(@Body() cr: CreateClientinfoDto) : Promise<Clientinfo> {
    return this.clientinfosService.create(CreateClientinfoDto);
  }

  @Get()
  findAll(): Promise<Clientinfo[]> {
    return this.clientinfosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<Clientinfo> {
    return this.clientinfosService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientinfoDto: UpdateClientinfoDto) {
    return this.clientinfosService.update(id, updateClientinfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) : Promise<{message: string}> {
    return this.clientinfosService.remove(id);
  }
}
