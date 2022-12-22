import { DataSource } from 'typeorm';

const dataSource = new DataSource({
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    username: 'root',
    password: '',
    database: 'member-service',
    entities: [__dirname + '/modules/**/**.entity.{ts,js}'],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
    synchronize: false,
});

export { dataSource };
