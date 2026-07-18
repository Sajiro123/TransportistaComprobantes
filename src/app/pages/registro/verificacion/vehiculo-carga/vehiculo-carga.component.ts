import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';

export interface Vehiculo {
  id: number;
  placa: string;
  categoria: string;
  topeFmt: string;
  nHab: string;
  autEntidad: string;
  tuc: string;
  estadoBg: string;
  estadoColor: string;
  estadoGlyph: string;
  estadoLabel: string;
  expanded?: boolean;
  propNom?: string;
  propTipo?: string;
  propDoc?: string;
  valChips?: any[];
  observed?: boolean;
  motivo?: string;
}

@Component({
  selector: 'app-vehiculo-carga',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, FormsModule],
  templateUrl: './vehiculo-carga.component.html',
  styleUrl: './vehiculo-carga.component.scss'
})
export class VehiculoCargaComponent implements OnInit {
  vehCount = 1;
  vehQ = '';
  vehCatF = '';
  vehValF = '';

  vehCatOpts = [
    { value: '', label: 'Todas las categorías' },
    { value: 'M2', label: 'M2' },
    { value: 'M3', label: 'M3' }
  ];

  vehValOpts = [
    { value: '', label: 'Todos los estados' },
    { value: 'ok', label: 'Validado' },
    { value: 'warn', label: 'Observado' }
  ];

  vehiclesView: Vehiculo[] = [
    {
      id: 1,
      placa: 'A1B-234',
      categoria: 'M3',
      topeFmt: '120.0',
      nHab: 'N° 12345-2023-ATU',
      autEntidad: 'ATU',
      tuc: '00123456',
      estadoBg: 'var(--ok-bg)',
      estadoColor: 'var(--ok)',
      estadoGlyph: '✓',
      estadoLabel: 'Validado',
      propNom: 'TRANSPORTES LIMA S.A.C.',
      propTipo: 'RUC',
      propDoc: '20512345678',
      valChips: [
        { label: 'Propietario', bg: 'var(--ok-bg)', fg: 'var(--ok)', glyph: '✓', statusLabel: 'Coincide', entidad: 'SUNARP' },
        { label: 'SOAT', bg: 'var(--ok-bg)', fg: 'var(--ok)', glyph: '✓', statusLabel: 'Vigente', entidad: 'MTC' },
        { label: 'CITV', bg: 'var(--ok-bg)', fg: 'var(--ok)', glyph: '✓', statusLabel: 'Vigente', entidad: 'MTC' }
      ]
    }
  ];

  ngOnInit(): void {}

  openBulk() {}
  openVadd() {}
  openValInfo() {}
  
  toggleRow(veh: Vehiculo) {
    veh.expanded = !veh.expanded;
  }
}
