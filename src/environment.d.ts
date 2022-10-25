export {}

declare global {
    interface ProcessEnv {
        ENV: 'test' | 'dev' | 'prod';
        ApiUrl: 'http://localhost:7071/api/';

    }
}