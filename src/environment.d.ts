export {}

declare global {
    interface ProcessEnv {
        ENV: 'test' | 'dev' | 'prod';
        REACT_APP_API_URL: 'https://extensionplatformcsbeta.azurewebsites.net/api/'
        REACT_APP_API_CODE: 'oGi9K5wyWiF58BWs3SEh-wZ4KRt7lSXDj3o_CEo6-Zc0AzFuMlLTDg=='
    }
}