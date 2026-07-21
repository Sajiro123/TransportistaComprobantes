export interface DatosTransportista {
  id: number;
  razonSocial: string;
  ruc: string;
  tipoEntidad: string;
  estado: string;
  totalAutorizaciones: number;
}

export interface DatosTransportistaResponse {
  data: {
    lista: DatosTransportista;
    respuesta: 'OK';
    mensaje: string;
  };
}

export interface VerificacionErrorDetalle {
  code: string;
  message: string;
  descripcion: string;
}

export interface VerificacionErrorResponse {
  data: {
    lista: VerificacionErrorDetalle;
    respuesta: 'ERROR';
    mensaje: string;
  };
}

export interface VerificacionServiceError extends VerificacionErrorDetalle {
  status?: number;
}
