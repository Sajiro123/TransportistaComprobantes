import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type AlcanceNota = 'Parcial' | 'Total';

interface NotaCredito {
  id: number;
  numero: string;
  facturaReferencia: string;
  alcance: AlcanceNota;
  emision: string;
  motivo: string;
  galones: number;
  mes: string;
}

@Component({
  selector: 'app-notas-credito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notas-credito.component.html',
  styleUrl: './notas-credito.component.scss',
})
export class NotasCreditoComponent {
  notas: NotaCredito[] = [
    {
      id: 1,
      numero: 'F002-0000091',
      facturaReferencia: 'F001-0001450',
      alcance: 'Total',
      emision: '28/06/2026',
      motivo: 'Anulación de la operación por devolución del combustible al grifo.',
      galones: 210,
      mes: 'Junio',
    },
  ];

  facturaReferencia = '';
  alcance: AlcanceNota = 'Total';
  motivo = '';
  formError = '';
  successMessage = '';

  seleccionarAlcance(alcance: AlcanceNota): void {
    this.alcance = alcance;
  }

  registrarNota(): void {
    const referencia = this.facturaReferencia.trim().toUpperCase();
    const motivo = this.motivo.trim();

    if (!/^F\d{3}-\d{7}$/.test(referencia) || !motivo) {
      this.formError = 'Ingresa una factura con formato F001-0001234 y describe el motivo.';
      this.successMessage = '';
      return;
    }

    const correlativo = 91 + this.notas.length;
    this.notas = [
      ...this.notas,
      {
        id: Math.max(0, ...this.notas.map(nota => nota.id)) + 1,
        numero: `F002-${String(correlativo).padStart(7, '0')}`,
        facturaReferencia: referencia,
        alcance: this.alcance,
        emision: '21/07/2026',
        motivo,
        galones: this.alcance === 'Total' ? 150 : 75,
        mes: 'Julio',
      },
    ];

    this.facturaReferencia = '';
    this.alcance = 'Total';
    this.motivo = '';
    this.formError = '';
    this.successMessage = 'La nota de crédito se registró correctamente.';
  }
}
