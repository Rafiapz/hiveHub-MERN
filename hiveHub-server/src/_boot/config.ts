import { envString, envNumber } from "./environment";

export const config = {
    http: {
        host: envString('HOST', 'localhost'),
        port: envNumber('PORT', 7700)
    },
    mongo: {
        database: envString('DB_NAME', 'hiveHub'),
        host: envString('DB_HOST', 'mongodb://127.0.0.1:27017'),
        username: envString('MONGO_USERNAME', 'hiveHubUser'),
        password: envString('MONGO_PASSWORD', 'hiveHubPassword')
    },

};