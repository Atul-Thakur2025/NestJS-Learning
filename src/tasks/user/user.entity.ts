import {
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   OneToMany,
   Entity,
}  from 'typeorm' 
import { Task } from '../task.entity';

@Entity()
export class User{
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({type: 'varchar', length: 255})
    name!: string;

    @Column({type: 'varchar', length: 255, unique: true})
    email!: string;

    @CreateDateColumn()
    createdAt!: Date;
    
    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Task, (task) => task.user)
    tasks!: Task[];
}