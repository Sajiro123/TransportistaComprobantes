// =========================================================
// Environment – DESARROLLO
// Actualiza API_BASE_URL con la URL real del backend
// =========================================================
export const environment = {
  production: false,

  /** URL base del API REST (IAM). Cambia según el entorno. */
  API_BASE_URL: (window as any).__env?.API_BASE_URL || 'http://localhost:8080/api_iam',

  /** URL base del API de Padrón (carga masiva). */
  API_PADRON_URL: (window as any).__env?.API_PADRON_URL || 'http://localhost:8081/api_padron',

  /** URL base del API de Organización (entidades y ámbitos). */
  API_ORG_URL: (window as any).__env?.API_ORG_URL || 'http://localhost:8081/api_org',

  /** URL base del API de Validación. */
  API_VALIDACION_URL: (window as any).__env?.API_VALIDACION_URL || 'http://localhost:8081/api_validacion',

  /** Clave privada para descifrado de campos sensibles (IAM) */
  ENCRYPTION_PRIVATE_KEY: (window as any).__env?.ENCRYPTION_PRIVATE_KEY || '',
};

