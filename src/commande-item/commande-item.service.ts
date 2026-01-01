import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommandeItemDto } from './dto/create-commande-item.dto';
import { UpdateCommandeItemDto } from './dto/update-commande-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandeItem } from './entities/commande-item.entity';
import { Repository } from 'typeorm';
import { Commande } from 'src/commandes/entities/commande.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CommandeItemService {
  constructor(
    @InjectRepository(CommandeItem)
    private readonly itemRepo: Repository<CommandeItem>,

    @InjectRepository(Commande)
    private readonly commandeRepo: Repository<Commande>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateCommandeItemDto, userId: string): Promise<CommandeItem> {
    const commande = await this.commandeRepo.findOne({
      where: { id: dto.commandeId },
      relations: ['items', 'client'],
    });

    if (!commande) {
      throw new NotFoundException('Commande introuvable');
    }

    if (commande.client.id !== userId) {
      throw new BadRequestException('Vous ne pouvez ajouter des items qu\'à vos propres commandes');
    }

    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Produit introuvable');
    }

    if (product.quantityKg < dto.quantityKg) {
      throw new BadRequestException('Stock insuffisant');
    }

    // 🔻 décrémenter le stock
    product.quantityKg -= dto.quantityKg;
    await this.productRepo.save(product);

    const item = this.itemRepo.create({
      commande,
      product,
      quantityKg: dto.quantityKg,
      unitPrice: product.pricePerKg,
    });

    const savedItem = await this.itemRepo.save(item);

    // 🔄 recalcul du total commande (use the helper method for accuracy)
    await this.recalculateCommandeTotal(commande.id);

    return savedItem;
  }

  async findAll(): Promise<CommandeItem[]> {
    return await this.itemRepo.find({
      relations: ['commande', 'commande.client', 'product'],
    });
  }

  async findOne(id: string): Promise<CommandeItem> {
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: ['commande', 'product'],
    });
    if (!item) {
      throw new NotFoundException('Item introuvable');
    }
    return item;
  }

  async update(
    id: string,
    dto: UpdateCommandeItemDto,
    userId: string,
  ): Promise<CommandeItem> {
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: ['commande', 'product', 'commande.client'],
    });

    if (!item) {
      throw new NotFoundException('Item introuvable');
    }

    if (item.commande.client.id !== userId) {
      throw new BadRequestException(
        "Vous ne pouvez modifier que les items de vos propres commandes",
      );
    }

    // Ensure quantityKg is provided (required for update)
    if (dto.quantityKg === undefined) {
      throw new BadRequestException('La quantité est requise pour la mise à jour');
    }

    const product = item.product;
    const oldQty = item.quantityKg;
    const newQty = dto.quantityKg;

    const diff = newQty - oldQty;

    if (diff > 0 && product.quantityKg < diff) {
      throw new BadRequestException('Stock insuffisant pour la mise à jour');
    }

    // 🔁 ajustement du stock
    product.quantityKg -= diff;
    await this.productRepo.save(product);

    item.quantityKg = newQty;

    await this.itemRepo.save(item);

    // 🔄 recalcul du total
    await this.recalculateCommandeTotal(item.commande.id);

    return item;
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: ['product', 'commande', 'commande.client'],
    });

    if (!item) {
      throw new NotFoundException('Item introuvable');
    }

    if (item.commande.client.id !== userId) {
      throw new BadRequestException('Vous ne pouvez supprimer que les items de vos propres commandes');
    }

    // 🔁 remettre le stock
    item.product.quantityKg += item.quantityKg;
    await this.productRepo.save(item.product);

    await this.itemRepo.remove(item);

    // Recalculer le total après suppression
    await this.recalculateCommandeTotal(item.commande.id);

    return { message: 'Produit retiré de la commande' };
  }

  private async recalculateCommandeTotal(commandeId: string): Promise<void> {
    const commande = await this.commandeRepo.findOne({
      where: { id: commandeId },
      relations: ['items'],
    });
    if (commande && commande.items) {
      commande.totalAmount = commande.items.reduce(
        (sum, i) => sum + Number(i.unitPrice) * Number(i.quantityKg),
        0,
      );
      await this.commandeRepo.save(commande);
    }
  }
}