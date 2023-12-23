/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAIL_PROXY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __APP_VERSION__: string;
declare const __COMMIT_HASH__: string;
