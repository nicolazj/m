export const isDev = process.env.NODE_ENV === 'development';
export const isClient = !!(process as any).browser;
