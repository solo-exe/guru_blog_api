import { Router } from 'express';

import { CreatePostDTO, UpdatePostDTO } from '../controllers/posts/posts.dto';
import * as postController from '../controllers/posts/posts';
import { validatePayload, authorizeUser } from '../middlewares/validation.middleware'
import { ParamIdDTO } from 'src/utils.dto';

const router = Router();

router.use(authorizeUser)

router.post('/', validatePayload(CreatePostDTO, 'body'), postController.createPost)

router.get('/feed', postController.getFeedPosts)

router.get('/', postController.getPosts)

router.get('/:id', validatePayload(ParamIdDTO, 'params'), postController.getPost)

router.patch('/:id',
    validatePayload(ParamIdDTO, 'params'),
    validatePayload(UpdatePostDTO, 'body'),
    postController.updatePost
)

router.delete('/:id', validatePayload(ParamIdDTO, 'params'), postController.deletePost)

module.exports = router