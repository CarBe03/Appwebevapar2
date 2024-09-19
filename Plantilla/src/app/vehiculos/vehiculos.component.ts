import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Ivehiculos } from '../Interfaces/ivehiculos';
import { Router, RouterLink } from '@angular/router';
import { VehiculosService } from '../Services/vehiculos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {
  listaVehiculos: Ivehiculos[] = [];

  constructor(private vehiculoServicio: VehiculosService) {}

  ngOnInit(): void {
    // Obtener la lista de vehículos al iniciar el componente
    this.cargarVehiculos();
  }

  // Método para cargar vehículos
  cargarVehiculos(): void {
    this.vehiculoServicio.todos().subscribe({
      next: (data: Ivehiculos[]) => {
        this.listaVehiculos = data;
      },
      error: (err) => {
        console.error('Error al cargar los vehículos', err);
        Swal.fire('Error', 'No se pudo cargar la lista de vehículos.', 'error');
      }
    });
  }

  eliminar(idVehiculo: number): void {
    Swal.fire({
      title: 'Vehículos',
      text: '¿Está seguro que desea eliminar el vehículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Vehículo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculoServicio.eliminar(idVehiculo).subscribe({
          next: () => {
            Swal.fire('Vehículos', 'El vehículo ha sido eliminado.', 'success');
            this.cargarVehiculos(); // Recargar la tabla después de eliminar
          },
          error: (err) => {
            console.error('Error al eliminar el vehículo', err);
            Swal.fire('Error', 'No se pudo eliminar el vehículo.', 'error');
          }
        });
      }
    });
  }
}
