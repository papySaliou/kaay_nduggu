import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
      @InjectRepository(Product)
      private productRepository: Repository<Product>,
      @InjectRepository(User)
      private userRepository: Repository<User>,
    ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
      // Vérifier que le producerId existe et a le rôle 'producer'
      const producer = await this.userRepository.findOne({
        where: { id: createProductDto.producerId },
      });

      if (!producer) {
        throw new NotFoundException(`User avec l'ID ${createProductDto.producerId} non trouvé.`);
      }

      if (producer.role !== 'producer') {
        throw new BadRequestException(`L'utilisateur avec l'ID ${createProductDto.producerId} n'est pas un producteur.`);
      }

      const newProduct = this.productRepository.create({
        name: createProductDto.name,
        pricePerKg: createProductDto.pricePerKg,
        quantityKg: createProductDto.quantityKg,
        harvestDate: new Date(createProductDto.harvestDate),
        available: createProductDto.available ?? true,
        zone: createProductDto.zone,
        producer: producer,
      });

      return await this.productRepository.save(newProduct);
    }

  async findAll(): Promise<Product[]> {
      return await this.productRepository.find({
        relations: ['producer'],
      });
    }

  async findOne(id: string): Promise<Product> {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['producer'],
      });
      if (!product) {
        throw new NotFoundException(`Product avec l'ID ${id} non trouvée.`);
      }
      return product;
    }

  async update(id: string, updateProductDto: UpdateProductDto, userId: string): Promise<Product> {
      const existingProduct = await this.findOne(id); // Vérifier si le produit existe
      if (existingProduct.producer.id !== userId) {
        throw new BadRequestException('Vous ne pouvez modifier que vos propres produits.');
      }
      const updateData: any = {};
      if (updateProductDto.name !== undefined) updateData.name = updateProductDto.name;
      if (updateProductDto.pricePerKg !== undefined) updateData.pricePerKg = updateProductDto.pricePerKg;
      if (updateProductDto.quantityKg !== undefined) updateData.quantityKg = updateProductDto.quantityKg;
      if (updateProductDto.harvestDate !== undefined) updateData.harvestDate = new Date(updateProductDto.harvestDate);
      if (updateProductDto.available !== undefined) updateData.available = updateProductDto.available;
      if (updateProductDto.zone !== undefined) updateData.zone = updateProductDto.zone;
      await this.productRepository.update(id, updateData);
      return await this.findOne(id); // Refetch to ensure type consistency and relations
    }

  async findByProducerId(producerId: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { producer: { id: producerId } },
      relations: ['producer'],
    });
  }

   async remove(id: string, userId: string): Promise<{ message: string }> {
    const product = await this.findOne(id); // Vérifier si le produit existe
    if (product.producer.id !== userId) {
      throw new BadRequestException('Vous ne pouvez supprimer que vos propres produits.');
    }
    await this.productRepository.delete(id);
    return { message: `Product avec l'ID ${id} supprimé avec succès.` };
  }
}