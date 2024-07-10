import { join } from 'path';

export default () => {
  return {
    messages: {
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      500: 'Request could not be completed at this moment, Please try again later.',
      600: 'Request could not be completed at this moment, support with contact you shortly.',
      __404: (item: string) => `${item} Not Found`,
      __NOT_EXIST: (item: string) => `${item} does not exist`,
    },
    db: {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      database: process.env.DB_NAME,
      entities: [join(__dirname, '**', `*.entity.{ts,js}`)],
      synchronize: false,
      logging: false,
      migrations: [__dirname + '/migrations/*-migration{.ts,.js}'],
    },
    jwt_secret: process.env.JWT_SECRET,
  };
};