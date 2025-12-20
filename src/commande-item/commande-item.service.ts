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
  
  async create(dto: CreateCommandeItemDto): Promise<CommandeItem> {
    const commande = await this.commandeRepo.findOne({
      where: { id: dto.commandeId },
      relations: ['items'],
    });

    if (!commande) {
      throw new NotFoundException('Commande introuvable');
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

    // 🔄 recalcul du total commande
    const total = commande.items.reduce(
      (sum, i) => sum + Number(i.unitPrice) * Number(i.quantityKg),
      Number(savedItem.unitPrice) * Number(savedItem.quantityKg),
    );

    commande.totalAmount = total;
    await this.commandeRepo.save(commande);

    return savedItem;
  }

  async remove(id: string): Promise<{ message: string }> {
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!item) {
      throw new NotFoundException('Item introuvable');
    }

    // 🔁 remettre le stock
    item.product.quantityKg += item.quantityKg;
    await this.productRepo.save(item.product);

    await this.itemRepo.remove(item);

    return { message: 'Produit retiré de la commande' };
  }
}
