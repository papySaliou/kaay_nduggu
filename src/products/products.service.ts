import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
      @InjectRepository(Product)
      private productRepository: Repository<Product>,
    ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
      const newProduct= this.productRepository.create(createProductDto);
      return await this.productRepository.save(newProduct);
    }

  async findAll(): Promise<Product[]> {
      return await this.productRepository.find();
    }

  async findOne(id: string): Promise<Product> {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {

        throw new NotFoundException(`Product avec l'ID ${id} non trouvée.`);
      }
      return product;
    }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
      const existingProduct = await this.findOne(id); // Vérifier si le produit existe
      await this.productRepository.update(id, updateProductDto);
      return { ...existingProduct, ...updateProductDto }; // Retourner la version mise à jour
    }

   async remove(id: string): Promise<{ message: string }> {
    const product = await this.findOne(id); // Vérifier si le produit existe
    await this.productRepository.delete(id);
    return { message: `Product avec l'ID ${id} supprimé avec succès.` };
  }
}
