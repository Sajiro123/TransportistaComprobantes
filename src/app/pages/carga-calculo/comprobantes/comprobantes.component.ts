import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

type Forma = 'A' | 'B';
type EstadoFiltro = 'todos' | 'val' | 'pend' | 'obs';

interface Comprobante {
  id: number;
  numero: string;
  fecha: string;
  placa: string;
  conductor: string;
  grifo: string;
  ubicacion: string;
  combustible: string;
  ppm: number;
  galones: number;
  estado: Exclude<EstadoFiltro, 'todos'>;
  estadoLabel: string;
  estadoIcon: string;
  tipoDocumento?: 'DNI' | 'CE';
  numeroDocumento?: string;
  licencia?: string;
  mes?: string;
  rucGrifo?: string;
  direccion?: string;
  departamento?: string;
  provincia?: string;
  distrito?: string;
}

interface AcumuladoVehiculo {
  placa: string;
  consumido: number;
  tope: number;
}

interface CompraMayorista {
  id: number;
  numero: string;
  distribuidor: string;
  ruc: string;
  combustible: string;
  ppm: number;
  galones: number;
}

interface VehiculoAbastecido {
  placa: string;
  subsidiable: boolean;
}

interface ComprobanteEditor {
  id: number;
  placa: string;
  conductor: string;
  tipoDocumento: 'DNI' | 'CE';
  numeroDocumento: string;
  licencia: string;
  serie: string;
  numero: string;
  emision: string;
  mes: string;
  rucGrifo: string;
  razonSocial: string;
  direccion: string;
  departamento: string;
  provincia: string;
  distrito: string;
  combustible: string;
  ppm: number;
  galones: number;
}

@Component({
  selector: 'app-comprobantes',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule],
  templateUrl: './comprobantes.component.html',
  styleUrl: './comprobantes.component.scss',
})
export class ComprobantesComponent {
  forma: Forma = 'A';
  busqueda = '';
  estadoFiltro: EstadoFiltro = 'todos';
  editor: ComprobanteEditor | null = null;
  editorModo: 'crear' | 'editar' = 'editar';
  editorError = '';

  comprobantes: Comprobante[] = [
    {
      id: 1,
      numero: 'F001-0001234',
      fecha: '12/06/2026',
      placa: 'AXG-712',
      conductor: 'Juan Pérez Quispe',
      grifo: 'Grifo Repsol Villa El Salvador',
      ubicacion: 'Villa El Salvador, Lima',
      combustible: 'B5',
      ppm: 45,
      galones: 320.5,
      estado: 'val',
      estadoLabel: 'Conforme',
      estadoIcon: 'fa-check',
    },
    {
      id: 2,
      numero: 'F001-0001450',
      fecha: '25/06/2026',
      placa: 'AXG-712',
      conductor: 'María López Torres',
      grifo: 'Grifo Repsol Villa El Salvador',
      ubicacion: 'Villa El Salvador, Lima',
      combustible: 'B5',
      ppm: 45,
      galones: 210,
      estado: 'obs',
      estadoLabel: 'Inhabilitado por N/C',
      estadoIcon: 'fa-ban',
    },
    {
      id: 3,
      numero: 'F002-0000087',
      fecha: '03/07/2026',
      placa: 'B2W-458',
      conductor: 'Pedro Ríos Vega',
      grifo: 'Grifo El Sol S.A.C.',
      ubicacion: 'San Juan de Miraflores, Lima',
      combustible: 'B20',
      ppm: 62,
      galones: 180,
      estado: 'obs',
      estadoLabel: 'Observado',
      estadoIcon: 'fa-exclamation',
    },
    {
      id: 4,
      numero: 'F001-0001600',
      fecha: '08/07/2026',
      placa: 'AXG-712',
      conductor: 'Juan Pérez Quispe',
      grifo: 'Estación no identificada',
      ubicacion: 'Ate, Lima',
      combustible: 'B5',
      ppm: 40,
      galones: 150,
      estado: 'pend',
      estadoLabel: 'En validación',
      estadoIcon: 'fa-clock',
    },
  ];

  acumulados: AcumuladoVehiculo[] = [
    { placa: 'AXG-712', consumido: 320.5, tope: 1915.41 },
    { placa: 'B2W-458', consumido: 0, tope: 888.45 },
  ];

  comprasMayorista: CompraMayorista[] = [
    {
      id: 1,
      numero: 'F050-0000210',
      distribuidor: 'Distribuidora de Combustibles Andina S.A.',
      ruc: '20600500400',
      combustible: 'B5',
      ppm: 38,
      galones: 1800,
    },
    {
      id: 2,
      numero: 'F050-0000355',
      distribuidor: 'Distribuidora de Combustibles Andina S.A.',
      ruc: '20600500400',
      combustible: 'B5',
      ppm: 38,
      galones: 1200,
    },
  ];

  vehiculosAbastecidos: VehiculoAbastecido[] = [
    { placa: 'AXG-712', subsidiable: true },
    { placa: 'B2W-458', subsidiable: true },
    { placa: 'C4T-119', subsidiable: false },
    { placa: 'D9K-201', subsidiable: false },
  ];

  get totalGalonesMayorista(): number {
    return this.comprasMayorista.reduce((total, compra) => total + compra.galones, 0);
  }

  get cantidadSubsidiables(): number {
    return this.vehiculosAbastecidos.filter(vehiculo => vehiculo.subsidiable).length;
  }

  get factorProrrateo(): number {
    return this.vehiculosAbastecidos.length
      ? this.cantidadSubsidiables / this.vehiculosAbastecidos.length
      : 0;
  }

  get galonesSubsidiados(): number {
    return this.totalGalonesMayorista * this.factorProrrateo;
  }

  get comprobantesFiltrados(): Comprobante[] {
    const termino = this.busqueda.trim().toLocaleLowerCase('es');

    return this.comprobantes.filter(comprobante => {
      const coincideEstado = this.estadoFiltro === 'todos' || comprobante.estado === this.estadoFiltro;
      const contenido = [
        comprobante.numero,
        comprobante.placa,
        comprobante.conductor,
        comprobante.grifo,
        comprobante.ubicacion,
        comprobante.combustible,
      ].join(' ').toLocaleLowerCase('es');

      return coincideEstado && (!termino || contenido.includes(termino));
    });
  }

  porcentaje(item: AcumuladoVehiculo): number {
    return Math.min((item.consumido / item.tope) * 100, 100);
  }

  retirar(id: number): void {
    this.comprobantes = this.comprobantes.filter(comprobante => comprobante.id !== id);
  }

  abrirEditor(comprobante: Comprobante): void {
    const [serie, ...numeroPartes] = comprobante.numero.split('-');
    const distrito = comprobante.ubicacion.split(',')[0]?.trim() || '';

    this.editorModo = 'editar';
    this.editor = {
      id: comprobante.id,
      placa: comprobante.placa,
      conductor: comprobante.conductor,
      tipoDocumento: comprobante.tipoDocumento || 'DNI',
      numeroDocumento: comprobante.numeroDocumento || (comprobante.placa === 'B2W-458' ? '45879621' : '41258963'),
      licencia: comprobante.licencia || (comprobante.placa === 'B2W-458' ? 'Q45879621' : 'Q41258963'),
      serie,
      numero: numeroPartes.join('-'),
      emision: comprobante.fecha,
      mes: comprobante.mes || this.mesDesdeFecha(comprobante.fecha),
      rucGrifo: comprobante.rucGrifo || (comprobante.grifo === 'Grifo El Sol S.A.C.' ? '20598765432' : '20487654321'),
      razonSocial: comprobante.grifo,
      direccion: comprobante.direccion || (distrito === 'Ate' ? 'Av. Nicolás Ayllón 2840' : 'Av. Separadora Industrial 1450'),
      departamento: comprobante.departamento || 'Lima',
      provincia: comprobante.provincia || 'Lima',
      distrito: comprobante.distrito || distrito,
      combustible: comprobante.combustible,
      ppm: comprobante.ppm,
      galones: comprobante.galones,
    };
    this.editorError = '';
  }

  abrirRegistro(): void {
    this.editorModo = 'crear';
    this.editor = {
      id: 0,
      placa: '',
      conductor: '',
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      licencia: '',
      serie: 'F001',
      numero: '',
      emision: '',
      mes: 'Junio',
      rucGrifo: '',
      razonSocial: '',
      direccion: '',
      departamento: '',
      provincia: '',
      distrito: '',
      combustible: 'B5',
      ppm: 0,
      galones: 0,
    };
    this.editorError = '';
  }

  cerrarEditor(): void {
    this.editor = null;
    this.editorError = '';
  }

  guardarEditor(): void {
    if (!this.editor) return;

    const modelo = this.editor;
    if (!modelo.placa || !modelo.numero.trim() || !modelo.galones || modelo.galones <= 0) {
      this.editorError = 'Completa la placa, el número de factura y una cantidad válida de galones.';
      return;
    }

    const datosComprobante = {
      numero: `${modelo.serie.trim() || 'F001'}-${modelo.numero.trim()}`,
      fecha: modelo.emision,
      placa: modelo.placa,
      conductor: modelo.conductor.trim(),
      grifo: modelo.razonSocial.trim() || 'Estación pendiente de validación',
      ubicacion: [modelo.distrito, modelo.departamento].filter(Boolean).join(', ') || 'Ubicación pendiente',
      combustible: modelo.combustible,
      ppm: Number(modelo.ppm),
      galones: Number(modelo.galones),
      tipoDocumento: modelo.tipoDocumento,
      numeroDocumento: modelo.numeroDocumento.trim(),
      licencia: modelo.licencia.trim(),
      mes: modelo.mes,
      rucGrifo: modelo.rucGrifo.trim(),
      direccion: modelo.direccion.trim(),
      departamento: modelo.departamento,
      provincia: modelo.provincia,
      distrito: modelo.distrito,
    };

    if (this.editorModo === 'crear') {
      const nuevoId = Math.max(0, ...this.comprobantes.map(comprobante => comprobante.id)) + 1;
      this.comprobantes = [
        ...this.comprobantes,
        {
          id: nuevoId,
          ...datosComprobante,
          estado: 'pend',
          estadoLabel: 'En validación',
          estadoIcon: 'fa-clock',
        },
      ];
    } else {
      this.comprobantes = this.comprobantes.map(comprobante => comprobante.id === modelo.id
        ? { ...comprobante, ...datosComprobante }
        : comprobante);
    }

    this.cerrarEditor();
  }

  @HostListener('document:keydown.escape')
  cerrarConEscape(): void {
    if (this.editor) this.cerrarEditor();
  }

  private mesDesdeFecha(fecha: string): string {
    const mes = fecha.split('/')[1];
    return ({ '05': 'Mayo', '06': 'Junio', '07': 'Julio' } as Record<string, string>)[mes] || 'Junio';
  }
}
