import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { VehiculoCargaComponent } from './vehiculo-carga/vehiculo-carga.component';

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
  steps: StepItem[] = [
    { label: 'Verificación', subtitle: 'Paso 1', icon: 'fa-solid fa-shield-check' },
    { label: 'Vehículos',    subtitle: 'Paso 2', icon: 'fa-solid fa-truck' },
  ];
  activeIndex = 0;

  // ── Datos del transportista ─────────────────────────────────
  datosTransportista: DatoTransportista[] = [
    { k: 'RUC', v: '20512345678' },
    { k: 'Razón social', v: 'TRANSPORTES LIMA S.A.C.' },
    { k: 'Estado SUNAT', v: 'ACTIVO' },
    { k: 'Condición SUNAT', v: 'HABIDO' },
    { k: 'Domicilio fiscal', v: 'Av. Javier Prado Este 1230, San Isidro, Lima' },
  ];

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
  ];

  get autCount(): number {
    return this.autorizaciones.length;
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
}
