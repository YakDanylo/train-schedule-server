import { Column, Entity, ObjectId, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Train {
  @PrimaryGeneratedColumn()
  id: ObjectId;

  @Column()
  departure: string;

  @Column()
  arrive: string;

  @Column()
  departureDate: Date;

  @Column()
  arriveDate: Date;
}
