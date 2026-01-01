import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Public } from 'src/auth/public.decorator';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
    role: 'producer' | 'client';
  };
}

@ApiTags('Produits')
@ApiBearerAuth('JWT-auth')
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles('producer')
  @ApiOperation({ summary: 'Créer un nouveau produit' })
  @ApiResponse({ status: 201, description: 'Produit créé.', type: Product })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lister tous les produits' })
  @ApiResponse({ status: 200, description: 'Liste des produits.', type: [Product] })
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('producer')
  @ApiOperation({ summary: 'Lister mes produits' })
  @ApiResponse({ status: 200, description: 'Liste des produits du producteur.', type: [Product] })
  findMyProducts(@Request() req: AuthenticatedRequest): Promise<Product[]> {
    return this.productsService.findByProducerId(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un produit par ID' })
  @ApiResponse({ status: 200, description: 'Produit trouvé.', type: Product })
  @ApiResponse({ status: 404, description: 'Produit non trouvé.' })
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Roles('producer')
  @ApiOperation({ summary: 'Mettre à jour un produit' })
  @ApiResponse({ status: 200, description: 'Produit mis à jour.', type: Product })
  @ApiResponse({ status: 403, description: 'Accès refusé.' })
  @ApiResponse({ status: 404, description: 'Produit non trouvé.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Request() req: AuthenticatedRequest) {
    return this.productsService.update(id, updateProductDto, req.user.userId);
  }

  @Delete(':id')
  @Roles('producer')
  @ApiOperation({ summary: 'Supprimer un produit' })
  @ApiResponse({ status: 200, description: 'Produit supprimé.' })
  @ApiResponse({ status: 403, description: 'Accès refusé.' })
  @ApiResponse({ status: 404, description: 'Produit non trouvé.' })
  remove(@Param('id') id: string, @Request() req: AuthenticatedRequest): Promise<{ message: string }> {
    return this.productsService.remove(id, req.user.userId);
  }
}
