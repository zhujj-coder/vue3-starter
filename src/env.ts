const env = import.meta.env

export const APP_TITLE = env.VITE_APP_TITLE
export const APP_VERSION = env.VITE_APP_VERSION
export const API_BASE = env.VITE_API_BASE
export const IS_DEBUG = env.VITE_DEBUG === 'true'
export const IS_DEV = env.DEV
export const IS_PROD = env.PROD
