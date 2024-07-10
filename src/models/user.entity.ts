import { Column, Entity, OneToMany } from "typeorm";
import { Base } from './base'
import { PostEntity } from './post.entity';

@Entity('users')
export class UserEntity extends Base {

  @Column({ name: 'first_name', nullable: true })
  first_name: string;

  @Column({ name: 'last_name', nullable: true })
  last_name: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: true })
  password?: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];
}
