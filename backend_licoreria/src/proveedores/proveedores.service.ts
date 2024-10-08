import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private proveedoresRepository: Repository<Proveedor>,
  ) {}

  async create(createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
    const existe = await this.proveedoresRepository.findOneBy({
      nit: createProveedorDto.nit.trim(),
      razonSocial: createProveedorDto.razonSocial.trim(),
    });

    if (existe) {
      throw new ConflictException('El proveedor ya existe');
    }
    return this.proveedoresRepository.save({
      nit: createProveedorDto.nit.trim(),
      razonSocial: createProveedorDto.razonSocial.trim(),
      direccion: createProveedorDto.direccion.trim(),
      telefono: createProveedorDto.telefono.trim(),
      email: createProveedorDto.email.trim(),
    });
  }

  async findAll(): Promise<Proveedor[]> {
    return this.proveedoresRepository.find();
  }

  async findOne(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedoresRepository.findOneBy({ id });
    if (!proveedor) throw new NotFoundException('El interprete no existe');
    return proveedor;
  }

  async update(
    id: number,
    updateProveedorDto: UpdateProveedorDto,
  ): Promise<Proveedor> {
    const proveedor = await this.findOne(id);
    const proveedorUpdate = Object.assign(proveedor, updateProveedorDto);
    return this.proveedoresRepository.save(proveedorUpdate);
  }

  async remove(id: number) {
    const proveedor = await this.findOne(id);
    return this.proveedoresRepository.softRemove(proveedor);
  }
}
