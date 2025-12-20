import { PartialType } from '@nestjs/mapped-types';
import { CreateProducteurDto } from './create-producteur.dto';

export class UpdateProducteurDto extends PartialType(CreateProducteurDto) {}
