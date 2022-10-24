namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_WORDPRESS_URL: string;
    NEXT_PUBLIC_WORDPRESS_API_URL: string;
    NEXT_PUBLIC_IMAGE_PLACEHOLDER: string;
    WOO_KEY: string;
    WOO_SECRET: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_URL: string;
    JWT_SECRET: string;
    SECRET: string;
  }
}
