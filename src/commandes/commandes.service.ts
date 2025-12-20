import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Commande } from './entities/commande.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommandesService {
    constructor(
    @InjectRepository(Commande)
    private commandeRepository: Repository<Commande>,
  ) {}

  async create(createCommandeDto: CreateCommandeDto): Promise<Commande> {
    const newCommande= this.commandeRepository.create(createCommandeDto);
    return await this.commandeRepository.save(newCommande);
  }

  async findOne(id: string): Promise<Commande> {
    const commande = await this.commandeRepository.findOne({ where: { id } });
    if (!commande) {

      throw new NotFoundException(`Commande avec l'ID ${id} non trouvée.`);
    }
    return commande;
  }

  async findAll(): Promise<Commande[]> {
    return await this.commandeRepository.find();
  }



  async update(id: string, updateCommandeDto: UpdateCommandeDto): Promise<Commande> {
    const existingCommande = await this.findOne(id); 
    await this.commandeRepository.update(id, updateCommandeDto);
    return { ...existingCommande, ...updateCommandeDto }; 
  }

  async remove(id: string): Promise<{ message: string }> {
    const commande = await this.findOne(id); 
    await this.commandeRepository.delete(id);
    return { message: `Commande avec l'ID ${id} supprimée avec succès.` };
  }

  // async update(id: number, updateCategorieDto: UpdateCategorieDto): Promise<Categorie> {
  //   const existingCategorie = await this.findOne(id); // Vérifier si la catégorie existe
  //   await this.categorieRepository.update(id, updateCategorieDto);
  //   return { ...existingCategorie, ...updateCategorieDto }; // Retourner la version mise à jour
  // }

  // async remove(id: number): Promise<{ message: string }> {
  //   const categorie = await this.findOne(id); // Vérifier si la catégorie existe
  //   await this.categorieRepository.delete(id);
  //   return { message: `Catégorie avec l'ID ${id} supprimée avec succès.` };
  // }
}
