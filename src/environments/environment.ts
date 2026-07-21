import type { AppEnvironment } from './environment.model';

const runtime = (window as any).__env ?? {};
const asBoolean = (value: unknown, fallback: boolean): boolean =>
  value === undefined ? fallback : String(value).toLowerCase() === 'true';

export const environment = {
  production: false,
  API_BASE_URL: runtime.API_BASE_URL || 'http://localhost:8080/api_iam',
  API_PADRON_URL: runtime.API_PADRON_URL || 'http://localhost:8081/api_padron',
  API_ORG_URL: runtime.API_ORG_URL || 'http://localhost:8081/api_org',
  API_VALIDACION_URL: runtime.API_VALIDACION_URL || 'http://localhost:8081/api_validacion',
  API_COMPROBANTE_URL: runtime.API_COMPROBANTE_URL || 'http://localhost:8082/api_comprobante',
  API_COMPROBANTE_MOCK: asBoolean(runtime.API_COMPROBANTE_MOCK, true),
  RECAPTCHA_SITE_KEY:
    runtime.RECAPTCHA_SITE_KEY || '6Ldu6FUrAAAAADnOURKYc9E_uUbGBRC35_ntvznt',
  ENCRYPTION_PRIVATE_KEY: runtime.ENCRYPTION_PRIVATE_KEY || '',
} satisfies AppEnvironment;
