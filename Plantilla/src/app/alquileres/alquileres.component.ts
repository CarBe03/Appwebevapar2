import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Ialquileres } from '../Interfaces/ialquileres';  // Asegúrate de tener la interfaz IAlquiler
import { AlquileresService } from '../Services/alquileres.service'; // Servicio de alquileres
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alquileres',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './alquileres.component.html',
  styleUrls: ['./alquileres.component.scss']
})
export class AlquileresComponent implements OnInit {
  listaAlquileres: Ialquileres[] = [];  // Lista para almacenar los alquileres

  constructor(private alquilerService: AlquileresService) {}

  ngOnInit() {
    this.cargarTabla();  // Llamamos la función para cargar la tabla al iniciar
  }

  cargarTabla() {
    this.alquilerService.todos().subscribe((data) => {
      console.log(data);
      this.listaAlquileres = data;  // Guardamos los alquileres obtenidos
    });
  }

  eliminar(alquiler_id: number) {
    Swal.fire({
      title: 'Alquileres',
      text: '¿Está seguro de que desea eliminar este alquiler?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Alquiler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alquilerService.eliminar(alquiler_id).subscribe((data) => {
          Swal.fire('Alquileres', 'El alquiler ha sido eliminado.', 'success');
          this.cargarTabla();  // Recargar la tabla después de eliminar
        });
      }
    });
  }
}
