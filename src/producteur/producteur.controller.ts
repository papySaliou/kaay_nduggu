import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProducteurService } from './producteur.service';
import { CreateProducteurDto } from './dto/create-producteur.dto';
import { UpdateProducteurDto } from './dto/update-producteur.dto';
import { Producteur } from './entities/producteur.entity';
import { UpdateCommandeDto } from 'src/commandes/dto/update-commande.dto';

@ApiTags('Producteurs')
@Controller('producteur')
export class ProducteurController {
  constructor(private readonly producteurService: ProducteurService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un producteur' })
  @ApiResponse({ status: 201, description: 'Producteur créé', type: Producteur })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(@Body() createProducteurDto: CreateProducteurDto) : Promise<Producteur> {
    return this.producteurService.create(createProducteurDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les producteurs' })
  @ApiResponse({ status: 200, description: 'Liste des producteurs', type: [Producteur] })
  findAll(): Promise<Producteur[]> {
    return this.producteurService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un producteur par ID' })
  @ApiResponse({ status: 200, description: 'Producteur trouvé', type: Producteur })
  @ApiResponse({ status: 404, description: 'Producteur non trouvé' })
  findOne(@Param('id') id: string) : Promise<Producteur> {
    return this.producteurService.findOne(id);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un producteur' })
  @ApiResponse({ status: 200, description: 'Producteur mis à jour', type: Producteur })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 404, description: 'Producteur non trouvé' })
  update(@Param('id') id: string, @Body() updateProducteurDto: UpdateProducteurDto) {
    return this.producteurService.update(id, updateProducteurDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un producteur' })
  @ApiResponse({ status: 200, description: 'Producteur supprimé' })
  @ApiResponse({ status: 404, description: 'Producteur non trouvé' })
  remove(@Param('id') id: string) : Promise<{message: string}> {
    return this.producteurService.remove(id);
  }

}
