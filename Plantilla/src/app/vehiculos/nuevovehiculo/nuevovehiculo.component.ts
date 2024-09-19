import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehiculosService } from 'src/app/Services/vehiculos.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuevovehiculo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nuevovehiculo.component.html',
  styleUrls: ['./nuevovehiculo.component.scss']
})
export class NuevovehiculoComponent implements OnInit {
  titulo = 'Nuevo Vehículo';
  totalapagar: number = 0;
  listaVehiculos: any[] = [];
  listaVehiculosFiltrada: any[] = [];

  frm_vehiculo: FormGroup;

  vehiculosSeleccionados: any[] = [
    {
      Marca: 'Toyota',
      Modelo: 'Corolla',
      Year: 2020,
      Precio: 15000,
      Total: 15000
    },
    {
      Marca: 'Nissan',
      Modelo: 'Sentra',
      Year: 2021,
      Precio: 18000,
      Total: 18000
    }
  ];

  constructor(
    private VehiculosService: VehiculosService,
    private navegacion: Router,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    // Inicialización del formulario de vehículo
    this.frm_vehiculo = new FormGroup({
      Marca: new FormControl('', Validators.required),
      Modelo: new FormControl('', Validators.required),
      Año: new FormControl('', Validators.required),
      Precio: new FormControl('', Validators.required),
      IVA: new FormControl('0.12', Validators.required),
      Total: new FormControl('', Validators.required)
    });

    this.VehiculosService.todos().subscribe({
      next: (data) => {
        this.listaVehiculos = data;
        this.listaVehiculosFiltrada = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  grabar() {
    // Generar PDF con html2canvas
    const DATA: any = document.getElementById('impresion');
    html2canvas(DATA).then((html) => {
      const imgAncho = (html.width * 200) / html.width;
      const imgAlto = (html.height * 200) / html.height;

      const contenido = html.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const posicion = 0;
      pdf.addImage(contenido, 'PNG', 0, posicion, imgAncho, imgAlto);
      pdf.save('vehiculo.pdf');
    });
  }

  calculos() {
    let precio = this.frm_vehiculo.get('Precio')?.value;
    let iva = this.frm_vehiculo.get('IVA')?.value;
    let total = precio * (1 + parseFloat(iva));
    this.frm_vehiculo.get('Total')?.setValue(total.toFixed(2));
  }

  cargarModal(valoresModal: any) {
    const nuevoVehiculo: any = {
      Marca: 'Honda',
      Modelo: 'Civic',
      Año: 2022,
      Precio: 20000,
      IVA: 12,
      Total: 22400
    };
    this.vehiculosSeleccionados.push(nuevoVehiculo);
    this.modal.dismissAll();

    this.vehiculosSeleccionados.reduce((valor, vehiculo) => {
      this.totalapagar += vehiculo.Total;
    }, 0);
  }
}
