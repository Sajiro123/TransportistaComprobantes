import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, map, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {
  DatosTransportista,
  DatosTransportistaResponse,
  VerificacionErrorResponse,
  VerificacionServiceError,
} from '../models/verificacion.models';

const MOCK_DATOS_TRANSPORTISTA: DatosTransportistaResponse = {
  data: {
    lista: {
      id: 1,
      razonSocial: 'Transportes Lima Sur S.A.C.',
      ruc: '20512345678',
      tipoEntidad: 'Persona jurídica',
      estado: 'Habilitado',
      totalAutorizaciones: 3,
    },
    respuesta: 'OK',
    mensaje: 'Detalle de transportista obtenido correctamente',
  },
};

@Injectable({ providedIn: 'root' })
export class ApiVerificacionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.API_COMPROBANTE_URL.replace(/\/$/, '');

  readonly usandoMocks = environment.API_COMPROBANTE_MOCK;

  obtenerDatosTransportista(ruc: string): Observable<DatosTransportista> {
    if (this.usandoMocks) {
      return of(MOCK_DATOS_TRANSPORTISTA).pipe(
        delay(350),
        map(response => response.data.lista),
      );
    }

    if (!/^\d{11}$/.test(ruc)) {
      return throwError((): VerificacionServiceError => ({
        code: 'VER_RUC_INVALIDO',
        message: 'RUC inválido',
        descripcion: 'El RUC del transportista debe contener 11 dígitos.',
      }));
    }

    return this.http.get<DatosTransportistaResponse>(
      `${this.baseUrl}/verificacion/datos`,
      { params: { ruc } },
    ).pipe(
      map(response => response.data.lista),
      catchError(error => throwError(() => this.normalizarError(error))),
    );
  }

  private normalizarError(error: HttpErrorResponse): VerificacionServiceError {
    const response = error.error as VerificacionErrorResponse | undefined;
    const detalle = response?.data?.lista;

    if (detalle?.code) {
      return { ...detalle, status: error.status };
    }

    return {
      code: error.status === 0 ? 'NETWORK_ERROR' : `HTTP_${error.status || 500}`,
      message: error.status === 0 ? 'No se pudo conectar al servicio' : 'Error al obtener datos del transportista',
      descripcion: error.status === 0
        ? 'Verifica que api_comprobante esté disponible y que la URL del entorno sea correcta.'
        : error.message || 'Ocurrió un error inesperado al procesar la solicitud.',
      status: error.status,
    };
  }
}
