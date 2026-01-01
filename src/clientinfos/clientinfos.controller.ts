import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClientinfosService } from './clientinfos.service';
import { CreateClientinfoDto } from './dto/create-clientinfo.dto';
import { UpdateClientinfoDto } from './dto/update-clientinfo.dto';
import { Clientinfo } from './entities/clientinfo.entity';

@ApiTags('Informations Clients')
@Controller('clientinfos')
export class ClientinfosController {
  constructor(private readonly clientinfosService: ClientinfosService) {}
//  @Post()
//   create(@Body() cr: CreateClientinfoDto) : Promise<Clientinfo> {
//     return this.clientinfosService.create(CreateClientinfoDto);
//   }
  @Post()
  @ApiOperation({ summary: 'Créer des informations client' })
  @ApiResponse({ status: 201, description: 'Informations créées', type: Clientinfo })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(@Body() createClientinfoDto: CreateClientinfoDto) {
    return this.clientinfosService.create(createClientinfoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les informations clients' })
  @ApiResponse({ status: 200, description: 'Liste des informations', type: [Clientinfo] })
  findAll(): Promise<Clientinfo[]> {
    return this.clientinfosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer des informations client par ID' })
  @ApiResponse({ status: 200, description: 'Informations trouvées', type: Clientinfo })
  @ApiResponse({ status: 404, description: 'Informations non trouvées' })
  findOne(@Param('id') id: string) : Promise<Clientinfo> {
    return this.clientinfosService.findOne(id);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour des informations client' })
  @ApiResponse({ status: 200, description: 'Informations mises à jour', type: Clientinfo })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 404, description: 'Informations non trouvées' })
  update(@Param('id') id: string, @Body() updateClientinfoDto: UpdateClientinfoDto) {
    return this.clientinfosService.update(id, updateClientinfoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer des informations client' })
  @ApiResponse({ status: 200, description: 'Informations supprimées' })
  @ApiResponse({ status: 404, description: 'Informations non trouvées' })
  remove(@Param('id') id: string) : Promise<{message: string}> {
    return this.clientinfosService.remove(id);
  }
}
