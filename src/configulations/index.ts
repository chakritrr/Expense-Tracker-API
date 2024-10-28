import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import env from 'src/constants/env';

export const TYPE_ORM_CONFIG = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (cs: ConfigService) =>
    ({
      type: 'postgres',
      host: cs.get<string>(env.POSTGRES_HOST),
      port: cs.get<number>(env.POSTGRES_PORT),
      username: cs.get<string>(env.POSTGRES_USER),
      password: cs.get<string>(env.POSTGRES_PASSWORD),
      database: cs.get<string>(env.POSTGRES_DBNAME),
      autoLoadEntities: true,
      synchronize: true, // ตอน po ตั้ง false
      logging: false,
      entities: ['dist/core/entities/*.entity{.ts,.js}'],
    }) as TypeOrmModuleOptions,
});
