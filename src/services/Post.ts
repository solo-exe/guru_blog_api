import { ObjectLiteral, Repository } from 'typeorm'

import AppDataSource, { PostEntity } from '../models';
import { Errors } from './'
import { UserEntity } from '../models'

export default class Post {
    private user?: UserEntity;
    private userRepo: Repository<UserEntity>
    private postRepo: Repository<PostEntity>

    constructor(user: UserEntity) {
        this.user = user
        this.userRepo = AppDataSource.getRepository(UserEntity)
        this.postRepo = AppDataSource.getRepository(PostEntity)
    }

    async createPost(title: string, body: string) {
        const post = await this.postRepo.save(this.postRepo.create({ user_id: this.user.id, title, body }))
        return {
            success: true,
            status: 200,
            message: 'Post Created Successfully.',
            data: { post },
        }
    }

    async getFeedPosts() {
        let posts: PostEntity[] | ObjectLiteral[] = await this.postRepo.find({
            where: { deleted: false },
            relations: ['user'],
            order: { id: 'DESC' }
        })
        posts = posts.map((post) => {
            post.author = {
                first_name: post.user.first_name,
                last_name: post.user.last_name,
                email: post.user.email
            }
            delete post.user
            delete post.user_id
            delete post.deleted
            delete post.created_at
            delete post.updated_at
            delete post.deleted_at
            return post
        })
        return {
            success: true,
            status: 200,
            message: 'success.',
            data: { posts },
        }
    }

    async getUserPosts() {
        let posts: PostEntity[] | ObjectLiteral[] = await this.postRepo.find({
            where: { deleted: false, user_id: this.user.id },
            relations: ['user'],
            order: { id: 'DESC' }
        })
        posts = posts.map((post) => {
            post.author = {
                first_name: post.user.first_name,
                last_name: post.user.last_name,
                email: post.user.email
            }
            delete post.user
            delete post.user_id
            delete post.deleted
            delete post.created_at
            delete post.updated_at
            delete post.deleted_at
            return post
        })
        return {
            success: true,
            status: 200,
            message: 'success.',
            data: { posts },
        }
    }

    async getPost(id: number) {
        const post = await this.postRepo.find({ where: { id, deleted: false } })
        if (!post) throw new Errors.NotFound('Post Not Found')
        return {
            success: true,
            status: 200,
            message: 'success.',
            data: { post },
        }
    }

    async updatePost(id: number, title?: string, body?: string) {
        let post = await this.postRepo.findOne({ where: { id, user_id: this.user.id, deleted: false } })
        if (!post) throw new Errors.NotFound('Post Not Found')
        const update = { title, body };
        for (const key in update) {
            if (!update[key]) delete update[key];
        }
        post = await this.postRepo.save(Object.assign(post, update));
        return {
            success: true,
            status: 200,
            message: 'Post Updated Successfully.',
            data: { post },
        }
    }

    async deletePost(id: number) {
        const post = await this.postRepo.findOne({ where: { id, user_id: this.user.id, deleted: false } })
        if (!post) throw new Errors.NotFound('Post Not Found')
        post.deleted = true
        await this.postRepo.save(post)
        return {
            success: true,
            status: 200,
            message: 'Post Deleted Successfully.',
            data: null
        }
    }
}