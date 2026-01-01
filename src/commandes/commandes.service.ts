import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Commande } from './entities/commande.entity';
import { User } from '../users/entities/user.entity';
import { CommandeItem } from '../commande-item/entities/commande-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommandesService {
    constructor(
    @InjectRepository(Commande)
    private commandeRepository: Repository<Commande>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(CommandeItem)
    private commandeItemRepository: Repository<CommandeItem>,
  ) {}

  async create(createCommandeDto: CreateCommandeDto): Promise<Commande> {
    // Vérifier que le clientId existe et a le rôle 'client'
    const client = await this.userRepository.findOne({
      where: { id: createCommandeDto.clientId },
    });

    if (!client) {
      throw new NotFoundException(`User avec l'ID ${createCommandeDto.clientId} non trouvé.`);
    }

    if (client.role !== 'client') {
      throw new BadRequestException(`L'utilisateur avec l'ID ${createCommandeDto.clientId} n'est pas un client.`);
    }

    const newCommande = this.commandeRepository.create({
      totalAmount: createCommandeDto.totalAmount,
      status: createCommandeDto.status,
      deliveryDate: new Date(createCommandeDto.deliveryDate),
      client: client,
    });

    return await this.commandeRepository.save(newCommande);
  }

  async findOne(id: string): Promise<Commande> {
    const commande = await this.commandeRepository.findOne({
      where: { id },
      relations: ['client', 'items', 'items.product'],
    });
    if (!commande) {
      throw new NotFoundException(`Commande avec l'ID ${id} non trouvée.`);
    }
    return commande;
  }

  async findAll(): Promise<Commande[]> {
    return await this.commandeRepository.find({
      relations: ['client', 'items', 'items.product'],
    });
  }

  async update(id: string, updateCommandeDto: UpdateCommandeDto, userId: string): Promise<Commande> {
    const existingCommande = await this.findOne(id);
    if (existingCommande.client.id !== userId) {
      throw new BadRequestException('Vous ne pouvez modifier que vos propres commandes.');
    }
    const updateData: any = {};
    if (updateCommandeDto.totalAmount !== undefined) updateData.totalAmount = updateCommandeDto.totalAmount;
    if (updateCommandeDto.status !== undefined) updateData.status = updateCommandeDto.status;
    if (updateCommandeDto.deliveryDate !== undefined) updateData.deliveryDate = new Date(updateCommandeDto.deliveryDate);
    await this.commandeRepository.update(id, updateData);
    return await this.findOne(id); // Refetch for type consistency
  }
  async remove(id: string, userId: string): Promise<{ message: string }> {
    const commande = await this.findOne(id); 
    if (commande.client.id !== userId) {
      throw new BadRequestException('Vous ne pouvez supprimer que vos propres commandes.');
    }
    await this.commandeRepository.delete(id);
    return { message: `Commande avec l'ID ${id} supprimée avec succès.` };
  }

  /**
   * Récupère toutes les commandes d'un client spécifique
   */
  async findByClientId(clientId: string): Promise<Commande[]> {
    return await this.commandeRepository.find({
      where: { client: { id: clientId } },
      relations: ['client', 'items', 'items.product', 'items.product.producer'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Récupère toutes les commandes contenant des produits d'un producteur spécifique
   */
  async findByProducerId(producerId: string): Promise<Commande[]> {
    // Trouver tous les produits du producteur
    const commandes = await this.commandeRepository
      .createQueryBuilder('commande')
      .leftJoinAndSelect('commande.client', 'client')
      .leftJoinAndSelect('commande.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .leftJoinAndSelect('product.producer', 'producer')
      .where('product.producer.id = :producerId', { producerId })
      .orderBy('commande.createdAt', 'DESC')
      .getMany();

    return commandes;
  }
}
