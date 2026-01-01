import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CommandeItemService } from './commande-item.service';
import { CreateCommandeItemDto } from './dto/create-commande-item.dto';
import { UpdateCommandeItemDto } from './dto/update-commande-item.dto';
import { CommandeItem } from './entities/commande-item.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
    role: 'producer' | 'client';
  };
}

@ApiTags('Articles de Commande')
@ApiBearerAuth('JWT-auth')
@Controller('commande-item')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommandeItemController {
  constructor(private readonly commandeItemService: CommandeItemService) {}

  @Post()
  @Roles('client')
  @ApiOperation({ summary: 'Créer un article de commande' })
  @ApiResponse({ status: 201, description: 'Article créé', type: CommandeItem })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  create(@Body() dto: CreateCommandeItemDto, @Request() req: AuthenticatedRequest) {
    return this.commandeItemService.create(dto, req.user.userId);
  }

  @Get()
  @Roles('client', 'producer')
  @ApiOperation({ summary: 'Lister tous les articles de commande' })
  @ApiResponse({ status: 200, description: 'Liste des articles', type: [CommandeItem] })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  findAll() {
    return this.commandeItemService.findAll();
  }

  @Get(':id')
  @Roles('client', 'producer')
  @ApiOperation({ summary: 'Récupérer un article de commande par ID' })
  @ApiResponse({ status: 200, description: 'Article trouvé', type: CommandeItem })
  @ApiResponse({ status: 404, description: 'Article non trouvé' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  findOne(@Param('id') id: string) {
    return this.commandeItemService.findOne(id);
  }

  @Patch(':id')
  @Roles('client')
  @ApiOperation({ summary: 'Mettre à jour un article de commande' })
  @ApiResponse({ status: 200, description: 'Article mis à jour', type: CommandeItem })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Article non trouvé' })
  update(@Param('id') id: string, @Body() dto: UpdateCommandeItemDto, @Request() req: AuthenticatedRequest) {
    return this.commandeItemService.update(id, dto, req.user.userId);
  }

  @Delete(':id')
  @Roles('client')
  @ApiOperation({ summary: 'Supprimer un article de commande' })
  @ApiResponse({ status: 200, description: 'Article supprimé' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Article non trouvé' })
  remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.commandeItemService.remove(id, req.user.userId);
  }
}
