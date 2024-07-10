import 'tsconfig-paths/register';
import { DataSource, DataSourceOptions } from 'typeorm';

import config from '../config';

import { PostEntity } from './post.entity'
import { UserEntity } from "./user.entity";


export {
    UserEntity,
    PostEntity
}

const AppDataSource = new DataSource({
    ...(config().db as DataSourceOptions)
});

export default AppDataSource;