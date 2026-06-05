import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { taskStatus } from './tasks.model';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column(
        {type:'varchar', length: 255},
    )
    title!: string;

    @Column(
        {type:'text'},
    )
    description!: string;

    @Column({
        type: 'enum',
        enum: taskStatus,
        default: taskStatus.OPEN,
    })
    status!: taskStatus;
}
