import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProducteurService } from './producteur.service';
import { CreateProducteurDto } from './dto/create-producteur.dto';
import { UpdateProducteurDto } from './dto/update-producteur.dto';
import { Producteur } from './entities/producteur.entity';
import { UpdateCommandeDto } from 'src/commandes/dto/update-commande.dto';

@Controller('producteur')
export class ProducteurController {
  constructor(private readonly producteurService: ProducteurService) {}

  @Post()
  create(@Body() createProducteurDto: CreateProducteurDto) : Promise<Producteur> {
    return this.producteurService.create(createProducteurDto);
  }

  @Get()
  findAll(): Promise<Producteur[]> {
    return this.producteurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<Producteur> {
    return this.producteurService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProducteurDto: UpdateProducteurDto) {
    return this.producteurService.update(id, updateProducteurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) : Promise<{message: string}> {
    return this.producteurService.remove(id);
  }

}
