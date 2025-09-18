// src/data-source.ts

import "reflect-metadata";
import { DataSource } from "typeorm";

// import { User } from "./domain/User"; 
// import { Account } from "./domain/Account";
// import { Category } from "./domain/Category";
// import { Transaction } from "./domain/Transaction";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3309,
    username: "financas_user",
    password: "financas_pass",
    database: "financas_db",
    synchronize: true,
    logging: false,
    entities: [

    ],
    migrations: [],
    subscribers: [],
})