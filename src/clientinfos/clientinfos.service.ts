import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientinfoDto } from './dto/create-clientinfo.dto';
import { UpdateClientinfoDto } from './dto/update-clientinfo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clientinfo } from './entities/clientinfo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientinfosService {
  constructor(
    @InjectRepository(Clientinfo)
    private clientinfoRepository: Repository<Clientinfo>,
  ) {}

  async create(createClientinfoDto: CreateClientinfoDto): Promise<Clientinfo> {
    const newClientinfo = this.clientinfoRepository.create(createClientinfoDto);
    return await this.clientinfoRepository.save(newClientinfo);
  }

  async findOne(id: string): Promise<Clientinfo> {
    const clientinfo = await this.clientinfoRepository.findOne({ where: { id } });
    if (!clientinfo) {
      throw new NotFoundException(`Clientinfo avec l'ID ${id} non trouvée.`);
    }
    return clientinfo;
  }

  async findAll(): Promise<Clientinfo[]> {
    return await this.clientinfoRepository.find();
  }

  async update(
    id: string,
    updateClientinfoDto: UpdateClientinfoDto,
  ): Promise<Clientinfo> {
    const existingClientinfo = await this.findOne(id);
    await this.clientinfoRepository.update(id, updateClientinfoDto);
    return { ...existingClientinfo, ...updateClientinfoDto };
  }

  async remove(id: string): Promise<{ message: string }> {
    const clientinfo = await this.findOne(id);
    await this.clientinfoRepository.delete(id);
    return { message: `Clientinfo avec l'ID ${id} supprimée avec succès.` };
  }
}
