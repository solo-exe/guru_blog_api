import {
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column({ name: 'deleted', type: 'boolean', default: false, nullable: false })
    'deleted': boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    'created_at': Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
    'updated_at': Date;

    @Column({
        name: 'deleted_at',
        default: null,
        type: 'timestamp',
        nullable: true,
    })
    'deleted_at': Date;
}
