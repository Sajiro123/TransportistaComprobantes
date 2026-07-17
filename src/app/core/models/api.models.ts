// =========================================================
// SIGT – ATU | API Models
// Mapeo exacto de la estructura del API REST
// =========================================================

// ── Request ───────────────────────────────────────────────
export interface LoginRequest {
  /** Usuario / email para autenticación */
  usuario: string;
  password: string;
  /** Token generado por Google reCAPTCHA v2 (opcional si el backend lo valida) */
  recaptchaToken?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// ── Response 200 ──────────────────────────────────────────
export interface LoginData {
  usuarioId?: number;
  nombrePersona: string;
  apellidoPaterno: string | null;
  apellidoMaterno: string | null;
  razonSocial: string | null;
  nombreEntidad: string;
  cargo?: string | null;
  correo?: string | null;
  entidadUuid?: string | null;
  numeroDocumento?: string | null;
  perfilCodigo?: string | null;
  perfilNombre?: string | null;
  telefono?: string | null;
  tipoDocumento?: string | null;
  tipoEntidad?: string | null;
  usuarioUuid?: string | null;
}

/** Campos cifrados cuando encryption.enabled=true en api_iam. */
export const ENCRYPTED_LOGIN_FIELDS = [
  'nombrePersona',
  'apellidoPaterno',
  'apellidoMaterno',
  'razonSocial',
  'tipoDocumento',
  'numeroDocumento',
  'correo',
  'telefono',
] as const satisfies ReadonlyArray<keyof LoginData>;

export type EncryptedLoginField = (typeof ENCRYPTED_LOGIN_FIELDS)[number];

export interface LoginResponse {
  data: LoginData;
}


// ── Response 401 / Error ──────────────────────────────────
export interface ApiErrorResponse {
  code: string;
  message: string;
  descripcion: string;
}

// ── Sesión local (guardada en sessionStorage) ─────────────
export interface ApiSession {
  expiresAt: number; // timestamp epoch ms
  user: LoginData;
}

// ── Update Profile ─────────────────────────────────────────
export interface UpdateEmailPhoneRequest {
  usuarioUuid: string;
  correo: string;
  telefono: string;
  cargo: string;
}

export interface UpdateEmailPhoneResponse {
  data?: {
    respuesta?: string;
    mensaje?: string;
  };
  mensaje?: string;
  message?: string;
}

// ── Catálogos y Listados (api_padron) ──────────────────────
export interface TipoServicio {
  id: number;
  codigo: string;
  nombre: string;
  subsidiable: boolean;
}

export interface TipoServicioResponse {
  data: {
    lista: TipoServicio[];
    respuesta: string;
    mensaje: string;
  };
}

export interface EstadoTitulo {
  id: number;
  codigo: string;
  nombre: string;
}

export interface EstadoTituloResponse {
  data: {
    lista: EstadoTitulo[];
    respuesta: string;
    mensaje: string;
  };
}

export interface EmpresaResponseItem {
  transportistaUuid: string;
  ruc: string;
  razonSocial: string;
  tipoPersona: string;
  representanteLegal: string;
  telefono: string;
  correo: string;
  estadoValidacionEmpresa: string;
  estadoValidacionEmpresaSemaforo: string;
  autorizacionUuid: string;
  tipoServicio: string;
  servicioSubsidiable: boolean;
  entidadEmisora: string;
  entidadEmisoraTipo: string;
  entidadEmisoraUuid: string;
  entidadAmbito: string;
  actoAdministrativo: string;
  partidaRegistral: string;
  fechaInicioVig: string;
  fechaFinVig: string;
  vigenteFechaCorte: boolean;
  estadoTitulo: string;
  estadoTituloSemaforo: string;
  estadoValidacionAutorizacion: string;
  estadoValidacionAutorizacionSemaforo: string;
  vehiculosTotales: number;
  vehiculosValidados: number;
  vehiculosHabilitados: number;
  vehiculosVigCorte: number;
  totalRegistros?: number;
}

export interface EmpresaListResponse {
  data: {
    lista: EmpresaResponseItem[];
    totalRegistros?: number;
    respuesta: string;
    mensaje: string;
  };
}

export interface TipoEntidad {
  id: number;
  codigo: string;
  nombre: string;
}

export interface TipoEntidadResponse {
  data: {
    lista: TipoEntidad[];
    respuesta: string;
    mensaje: string;
  };
}

export interface Entidad {
  entidadUuid: string;
  id: number;
  codigo: string;
  nombre: string;
  tipoEntidad: string;
}

export interface EntidadResponse {
  data: {
    lista: Entidad[];
    respuesta: string;
    mensaje: string;
  };
}

export interface CategoriaVehicular {
  id: number;
  codigo: string;
  nombre: string;
  subsidiable: boolean;
}

export interface CategoriaVehicularResponse {
  data: {
    lista: CategoriaVehicular[];
    respuesta: string;
    mensaje: string;
  };
}

export interface EstadoSemaforo {
  codigo: string;
  nombre: string;
  significado: string;
  activo: boolean;
  colorHex: string;
  colorHexFondo: string;
  colorHexBorde: string;
  colorHexTextoConFondo: string;
  colorHexTextoSinFondo: string;
}

export interface EstadoSemaforoResponse {
  data: {
    lista: EstadoSemaforo[];
    respuesta: string;
    mensaje: string;
  };
}

export interface EstadoValidacion {
  id: number;
  codigo: string;
  nombre: string;
  codigoAplicacion: string;
}

export interface EstadoValidacionResponse {
  data: {
    lista: EstadoValidacion[];
    respuesta: string;
    mensaje: string;
  };
}




