import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { VehiculoCargaComponent } from './vehiculo-carga/vehiculo-carga.component';
import { ApiVerificacionService } from '../../../core/services/api-verificacion.service';
import { ApiAuthService } from '../../../core/services/api-auth.service';
import { AuthService } from '../../../core/services/auth.service';
import { DatosTransportista, VerificacionServiceError } from '../../../core/models/verificacion.models';

export interface DatoTransportista {
  k: string;
  v: string;
}

export interface Autorizacion {
  servicio: string;
  estado: string;
  badgeSeverity: 'success' | 'warn' | 'danger' | 'secondary';
  resolucion: string;
  autoridad: string;
  ambito: string;
  vigencia: string;
}

export interface Condicion {
  glyph: string;
  label: string;
  estado: string;
  estadoColor: 'success' | 'warn' | 'danger';
  barColor: string;
  why: string;
}

export interface StepItem {
  label: string;
  icon: string;
  subtitle?: string;
}

@Component({
  selector: 'app-verificacion',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, VehiculoCargaComponent],
  templateUrl: './verificacion.component.html',
  styleUrl: './verificacion.component.scss',
})
export class VerificacionComponent implements OnInit {
  private readonly apiVerificacion = inject(ApiVerificacionService);
  private readonly apiAuth = inject(ApiAuthService);
  private readonly auth = inject(AuthService);

  steps: StepItem[] = [
    { label: 'Verificación', subtitle: 'Paso 1', icon: 'fa-solid fa-shield-check' },
    { label: 'Vehículos',    subtitle: 'Paso 2', icon: 'fa-solid fa-truck' },
  ];
  activeIndex = 0;

  // ── Datos del transportista ─────────────────────────────────
  datosTransportista: DatoTransportista[] = [];
  cargandoDatos = false;
  errorDatos = '';
  rucConsulta = '';
  readonly usandoMocks = this.apiVerificacion.usandoMocks;
  private transportista: DatosTransportista | null = null;

  // ── Autorizaciones ──────────────────────────────────────────
  autorizaciones: Autorizacion[] = [
    {
      servicio: 'Transporte Urbano Regular – Lima Metropolitana',
      estado: 'Vigente',
      badgeSeverity: 'success',
      resolucion: 'RD-2023-0412-ATU',
      autoridad: 'ATU',
      ambito: 'Lima Metropolitana',
      vigencia: '01/03/2023 – 28/02/2026',
    },
    {
      servicio: 'Transporte Especial – Servicio Escolar',
      estado: 'Vencida',
      badgeSeverity: 'danger',
      resolucion: 'RD-2021-0089-ATU',
      autoridad: 'ATU',
      ambito: 'Lima Metropolitana',
      vigencia: '15/01/2021 – 14/01/2024',
    },
    {
      servicio: 'Transporte Especial – Servicio de trabajadores',
      estado: 'Vigente',
      badgeSeverity: 'success',
      resolucion: 'RD-2024-0178-ATU',
      autoridad: 'ATU',
      ambito: 'Lima Metropolitana',
      vigencia: '10/05/2024 – 09/05/2027',
    },
  ];

  get autCount(): number {
    return this.transportista?.totalAutorizaciones ?? this.autorizaciones.length;
  }

  // ── Semáforo de condiciones ─────────────────────────────────
  condiciones: Condicion[] = [
    {
      glyph: '✓',
      label: 'RUC activo y habido',
      estado: 'OK',
      estadoColor: 'success',
      barColor: 'var(--ok)',
      why: 'Tu empresa aparece como ACTIVO / HABIDO en SUNAT. Estás apto para continuar.',
    },
    {
      glyph: '✓',
      label: 'Autorización de transporte vigente',
      estado: 'OK',
      estadoColor: 'success',
      barColor: 'var(--ok)',
      why: 'Tienes al menos una autorización vigente ante la ATU. El subsidio aplica a los vehículos habilitados bajo esa autorización.',
    },
    {
      glyph: '!',
      label: 'Vehículos habilitados',
      estado: 'PENDIENTE',
      estadoColor: 'warn',
      barColor: 'var(--warn)',
      why: 'En el siguiente paso deberás confirmar los vehículos habilitados bajo tu autorización vigente.',
    },
  ];

  sinAutVigente = false; // true mostraría el banner de error

  ngOnInit() {
    this.sinAutVigente = !this.autorizaciones.some(a => a.badgeSeverity === 'success');
    this.cargarDatosTransportista();
  }

  cargarDatosTransportista(): void {
    const usuarioSesion = this.apiAuth.getUserFromSession() ?? this.auth.getSession();
    const rucSesion = usuarioSesion?.numDocumento || '';
    this.rucConsulta = this.usandoMocks ? '20512345678' : rucSesion;

    if (!this.rucConsulta) {
      this.errorDatos = 'No se encontró el RUC del transportista en la sesión actual.';
      return;
    }

    this.cargandoDatos = true;
    this.errorDatos = '';

    this.apiVerificacion.obtenerDatosTransportista(this.rucConsulta).pipe(
      finalize(() => this.cargandoDatos = false),
    ).subscribe({
      next: datos => this.aplicarDatosTransportista(datos),
      error: (error: VerificacionServiceError) => {
        this.errorDatos = error.descripcion || error.message;
      },
    });
  }

  nextStep() {
    if (this.activeIndex < this.steps.length - 1) {
      this.activeIndex++;
    }
  }

  prevStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  private aplicarDatosTransportista(datos: DatosTransportista): void {
    this.transportista = datos;
    this.datosTransportista = [
      { k: 'ID interno', v: String(datos.id) },
      { k: 'RUC', v: datos.ruc },
      { k: 'Razón social', v: datos.razonSocial },
      { k: 'Tipo de entidad', v: datos.tipoEntidad },
      { k: 'Estado', v: datos.estado },
      { k: 'Total de autorizaciones', v: String(datos.totalAutorizaciones) },
    ];

    const habilitado = datos.estado.trim().toLowerCase() === 'habilitado';
    this.condiciones = this.condiciones.map((condicion, index) => index === 0
      ? {
          ...condicion,
          glyph: habilitado ? '✓' : '!',
          label: 'Estado del transportista',
          estado: datos.estado.toUpperCase(),
          estadoColor: habilitado ? 'success' : 'danger',
          barColor: habilitado ? 'var(--ok)' : 'var(--bad)',
          why: habilitado
            ? 'El transportista figura como habilitado en el registro consultado. Está apto para continuar.'
            : 'El transportista no figura como habilitado. Revisa su situación antes de continuar.',
        }
      : condicion);
  }
}
