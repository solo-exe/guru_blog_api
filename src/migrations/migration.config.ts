import 'tsconfig-paths/register';

import { DataSource, DataSourceOptions } from 'typeorm';
import config from '../config';

const datasource = new DataSource({
  ...config().db,
} as DataSourceOptions);

export default datasource;
