declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'dev' | 'prod';
            PORT?: string;

            // Database connection
            PG_HOST?: string;
            PG_USER?: string;
            PG_PASSWORD?: string;
            PG_DB?: string;
            PG_PORT?: string;
        }
    }
}

export { };
