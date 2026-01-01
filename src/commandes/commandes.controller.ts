import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CommandesService } from './commandes.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Commande } from './entities/commande.entity';
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

@ApiTags('Commandes')
@ApiBearerAuth('JWT-auth')
@Controller('commandes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}

  @Post()
  @Roles('client')
  @ApiOperation({ summary: 'Créer une nouvelle commande' })
  @ApiResponse({ status: 201, description: 'Commande créée.', type: Commande })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  create(@Body() createCommandeDto: CreateCommandeDto) : Promise<Commande> {
    return this.commandesService.create(createCommandeDto);
  }

  @Get()
  @Roles('client', 'producer')
  @ApiOperation({ summary: 'Lister toutes les commandes' })
  @ApiResponse({ status: 200, description: 'Liste des commandes.', type: [Commande] })
  findAll(): Promise<Commande[]> {
    return this.commandesService.findAll();
  }

  @Get('my')
  @Roles('client')
  @ApiOperation({ summary: 'Lister mes commandes' })
  @ApiResponse({ status: 200, description: 'Liste des commandes du client.', type: [Commande] })
  findMyOrders(@Request() req: AuthenticatedRequest): Promise<Commande[]> {
    return this.commandesService.findByClientId(req.user.userId);
  }

  @Get('producer-orders')
  @Roles('producer')
  @ApiOperation({ summary: 'Lister les commandes pour mes produits (producteur)' })
  @ApiResponse({ status: 200, description: 'Liste des commandes', type: [Commande] })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  findOrdersForMyProducts(@Request() req: AuthenticatedRequest): Promise<Commande[]> {
    return this.commandesService.findByProducerId(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une commande par ID' })
  @ApiResponse({ status: 200, description: 'Commande trouvée', type: Commande })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  findOne(@Param('id') id: string) : Promise<Commande> {
    return this.commandesService.findOne(id);
  }


  @Patch(':id')
  @Roles('client')
  @ApiOperation({ summary: 'Mettre à jour une commande' })
  @ApiResponse({ status: 200, description: 'Commande mise à jour', type: Commande })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  update(@Param('id') id: string, @Body() updateCommandeDto: UpdateCommandeDto, @Request() req: AuthenticatedRequest) {
    return this.commandesService.update(id, updateCommandeDto, req.user.userId);
  }

  @Delete(':id')
  @Roles('client')
  @ApiOperation({ summary: 'Supprimer une commande' })
  @ApiResponse({ status: 200, description: 'Commande supprimée' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) : Promise<{message: string}> {
    return this.commandesService.remove(id, req.user.userId);
  }

  /**
   * Endpoint pour les clients : récupère toutes leurs commandes
   */
  @Get('my-commandes')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Récupérer mes commandes (client)' })
  @ApiResponse({ status: 200, description: 'Liste des commandes', type: [Commande] })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  getMyCommandes(@Request() req: AuthenticatedRequest): Promise<Commande[]> {
    return this.commandesService.findByClientId(req.user.userId);
  }

  /**
   * Endpoint pour les producteurs : récupère toutes les commandes contenant leurs produits
   */
  @Get('producer/my-commandes')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Récupérer les commandes de mes produits (producteur)' })
  @ApiResponse({ status: 200, description: 'Liste des commandes', type: [Commande] })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  getProducerCommandes(@Request() req: AuthenticatedRequest): Promise<Commande[]> {
    return this.commandesService.findByProducerId(req.user.userId);
  }
}
