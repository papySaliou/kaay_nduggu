import { PartialType } from '@nestjs/swagger';
import { CreateCommandeItemDto } from './create-commande-item.dto';

export class UpdateCommandeItemDto extends PartialType(CreateCommandeItemDto) {}
