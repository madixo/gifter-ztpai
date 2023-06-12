declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SECRET: string;
            COOKIE: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_DATABASE: string;
        }
    }
}

export {};

