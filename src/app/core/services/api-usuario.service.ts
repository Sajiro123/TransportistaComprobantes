import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import {
  UpdateEmailPhoneRequest,
  UpdateEmailPhoneResponse,
} from '../models/api.models';

@Injectable({
  providedIn: 'root',
})
export class ApiUsuarioService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = environment.API_BASE_URL;

  /**
   * Actualiza el correo y el teléfono del usuario.
   * PUT /api_iam/usuario/actualizar/contacto
   */
  actualizarCorreoTelefono(
    payload: UpdateEmailPhoneRequest,
  ): Observable<UpdateEmailPhoneResponse> {
    return this.http.put<UpdateEmailPhoneResponse>(
      `${this.API_URL}/usuario/actualizar/contacto`,
      payload,
      { withCredentials: true },
    );
  }

  /**
   * Actualiza la contraseña del usuario.
   * PUT /api_iam/usuario/actualizar/contrasena
   */
  actualizarContrasena(payload: any): Observable<any> {
    return this.http.put<any>(
      `${this.API_URL}/usuario/actualizar/contrasena`,
      payload,
      { withCredentials: true },
    );
  }
}
