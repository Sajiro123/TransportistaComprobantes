// =========================================================
// SIGT – ATU | Models
// =========================================================

export interface Usuario {
  email: string;
  password: string;
  nombre: string;
  tipoEntidad: 'regional' | 'municipal' | 'empresa' | string;
  entidad: string;
  documentoCargo?: string;
  registradoEn?: string;
  // Extended profile fields (captured at registration)
  primerApellido?: string;
  segundoApellido?: string;
  tipoDocumento?: string;
  numDocumento?: string;
  departamento?: string;
  provincia?: string;
  distrito?: string;
  telefono?: string;
  cargo?: string;
  perfilNombre?: string;
  perfilCodigo?: string;
  razonSocial?: string;
  entidadUuid?: string;
  usuarioUuid?: string;
  banco?: string;
  cci?: string;
}

export interface RegistroVehicular {
  id: number;
  fila: number;
  placa: string;
  categoria: 'M2' | 'M3' | 'N1' | 'N2' | 'N3' | string;
  tuc: string;
  fecha_inicio_tuc: string;
  fecha_fin_tuc: string;
  estado_tuc: string;
  transportista: string;
  ruc: string;
  partida_registral: string;
  tipo_servicio: string;
  acto_administrativo: string;
  fecha_inicio_aut: string;
  fecha_fin_aut: string;
  estado_aut: string;
  valido: boolean;
  elegible: boolean;
  errores: string[];
}

export interface EnvioATU {
  id: number;
  entidad: string;
  oficio: string;
  documento: string;
  fecha: string;
  total: number;
  elegibles: number;
  estado: string;
}

export interface RegistroRaw {
  placa: string;
  categoria: string;
  tuc: string;
  fecha_inicio_tuc: string;
  fecha_fin_tuc: string;
  estado_tuc: string;
  transportista: string;
  ruc: string;
  partida_registral: string;
  tipo_servicio: string;
  acto_administrativo: string;
  fecha_inicio_aut: string;
  fecha_fin_aut: string;
  estado_aut: string;
}

export interface DatosEmpresa {
  razonSocial: string;
  ruc: string;
  estadoCondicion: string;
  tipoEntidad: string;
  autoridad: string;
  autorizacionVigente: boolean;
}

export interface RepresentanteLegal {
  nombresApellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
}

export interface ContactoTransportista {
  nombresApellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  correoElectronico: string;
  telefono: string;
}

export interface PerfilTransportista {
  datosEmpresa: DatosEmpresa;
  representanteLegal: RepresentanteLegal;
  contacto: ContactoTransportista;
}

export interface PerfilTransportistaResponse {
  data: {
    lista: PerfilTransportista;
    respuesta: string;
    mensaje: string;
  };
}

export interface ActualizarContactoRequest {
  nombresApellidos: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
  telefono: string;
}

export interface ActualizarContactoResponse {
  data: {
    lista: ContactoTransportista;
    respuesta: string;
    mensaje: string;
  };
}

export interface CuentaAbono {
  banco: string;
  codigoCuentaInterbancario: string;
}

export interface CuentaAbonoResponse {
  data: {
    lista: CuentaAbono | null;
    respuesta: string;
    mensaje: string;
  };
}

export interface GuardarCuentaAbonoRequest {
  banco: string;
  codigoCuentaInterbancario: string;
}

export interface GuardarCuentaAbonoResponse {
  data: {
    lista: CuentaAbono;
    respuesta: string;
    mensaje: string;
  };
}

export type EstadoValidacionVehiculo =
  | 'VALIDADO'
  | 'EN_REVISION'
  | 'RECHAZADO';

export interface PropietarioVehiculo {
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
}

export interface ValidacionVehiculo {
  campo: string;
  estado: EstadoValidacionVehiculo;
  entidadValidadora: string;
}

export interface VehiculoTransportista {
  id: number;
  placa: string;
  categoria: string;
  topeGalones: number;
  numeroAutorizacion: string;
  entidadAutorizadora: string | null;
  tuc: string;
  tucVencida: boolean;
  estadoValidacion: EstadoValidacionVehiculo;
  propietario: PropietarioVehiculo;
  validaciones: ValidacionVehiculo[];
}

export interface VehiculosFiltros {
  ruc: string;
  busqueda?: string;
  categoria?: string;
  estado?: EstadoValidacionVehiculo | '';
}

export interface VehiculosResponse {
  data: {
    lista: VehiculoTransportista[];
    respuesta: string;
    mensaje: string;
  };
}

export interface VehiculoDetalleResponse {
  data: {
    lista: VehiculoTransportista;
    respuesta: string;
    mensaje: string;
  };
}

export interface VehiculoNoEncontrado {
  data: {
    lista: {
      code: 'VEH_004';
      message: string;
      descripcion: string;
    };
    respuesta: 'ERROR';
    mensaje: string;
  };
}

export interface RegistrarVehiculoRequest {
  placa: string;
  categoria: string;
  topeGalones: number;
  numeroAutorizacion: string;
  tuc: string;
  propietarioTipoDocumento?: string;
  propietarioNumeroDocumento: string;
  propietarioNombre?: string;
}

export interface RegistrarVehiculoResponse {
  data: {
    lista: VehiculoTransportista;
    respuesta: string;
    mensaje: string;
  };
}

export type ActualizarVehiculoRequest = RegistrarVehiculoRequest;
export type ActualizarVehiculoResponse = RegistrarVehiculoResponse;

export interface EliminarVehiculoResponse {
  data: {
    lista: null;
    respuesta: 'OK';
    mensaje: string;
  };
}
