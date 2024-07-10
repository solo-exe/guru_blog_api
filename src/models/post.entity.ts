import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { UserEntity } from './user.entity';
import { Base } from './base';


@Entity({ name: 'posts' })
export class PostEntity extends Base {
    @Column({ name: 'title', type: 'varchar', nullable: false })
    title: string;

    @Column({ name: 'body', type: 'varchar', nullable: false })
    body: string;

    @Column({ name: 'user_id', type: 'integer', nullable: false })
    user_id: number;
    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
