import { Producto } from 'src/productos/entities/producto.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('detalle_ventas')
export class Detalleventa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precioVenta: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_elimanacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Venta, (venta) => venta.detalleventas)
  @JoinColumn({ name: 'id_venta', referencedColumnName: 'id' })
  venta: Venta;

  @ManyToOne(() => Producto, (producto) => producto.detalleventas)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;
}
