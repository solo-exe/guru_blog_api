import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { UserEntity } from './user.entity';
import { Base } from './base';


@Entity({ name: 'posts' })
export class PostEntity extends Base {
    @Column({ name: 'text', type: 'varchar', nullable: false })
    text: string;

    @Column({ name: 'user_id', type: 'integer', nullable: false })
    user_id: number;
    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
