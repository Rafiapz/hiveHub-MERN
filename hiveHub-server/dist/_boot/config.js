"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const environment_1 = require("./environment");
exports.config = {
    http: {
        host: (0, environment_1.envString)('HOST', 'localhost'),
        port: (0, environment_1.envNumber)('PORT', 7700)
    },
    mongo: {
        database: (0, environment_1.envString)('DB_NAME', 'hiveHub'),
        host: (0, environment_1.envString)('DB_HOST', 'mongodb://127.0.0.1:27017'),
        username: (0, environment_1.envString)('MONGO_USERNAME', 'hiveHubUser'),
        password: (0, environment_1.envString)('MONGO_PASSWORD', 'hiveHubPassword')
    },
};
