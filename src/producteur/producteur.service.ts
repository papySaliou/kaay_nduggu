import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProducteurDto } from './dto/create-producteur.dto';
import { UpdateProducteurDto } from './dto/update-producteur.dto';
import { Producteur } from './entities/producteur.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProducteurService {
  constructor(
    @InjectRepository(Producteur)
    private producteurRepository: Repository<Producteur>,
  ) {}

  async create(createProducteurDto: CreateProducteurDto): Promise<Producteur> {
    const newProducteur = this.producteurRepository.create(createProducteurDto);
    return await this.producteurRepository.save(newProducteur);
  }

  async findOne(id: string): Promise<Producteur> {
    const producteur = await this.producteurRepository.findOne({ where: { id } });
    if (!producteur) {
      throw new NotFoundException(`Producteur avec l'ID ${id} non trouvée.`);
    }
    return producteur;
  }

  async findAll(): Promise<Producteur[]> {
    return await this.producteurRepository.find();
  }

  async update(
    id: string,
    updateProducteurDto: UpdateProducteurDto,
  ): Promise<Producteur> {
    const existingProducteur = await this.findOne(id);
    await this.producteurRepository.update(id, updateProducteurDto);
    return { ...existingProducteur, ...updateProducteurDto };
  }

  async remove(id: string): Promise<{ message: string }> {
    const producteur = await this.findOne(id);
    await this.producteurRepository.delete(id);
    return { message: `Producteur avec l'ID ${id} supprimé avec succès.` };
  }
}
