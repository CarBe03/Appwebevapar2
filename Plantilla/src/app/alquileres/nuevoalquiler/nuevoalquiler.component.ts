import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlquileresService } from 'src/app/Services/alquileres.service';
import { Ialquileres } from 'src/app/Interfaces/ialquileres';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevoalquiler',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevoalquiler.component.html',
  styleUrls: ['./nuevoalquiler.component.scss']
})
export class NuevoalquilerComponent implements OnInit {
  frm_Alquiler = new FormGroup({
    vehiculo_id: new FormControl('', Validators.required),
    cliente_id: new FormControl('', Validators.required),
    fecha_inicio: new FormControl('', Validators.required),
    fecha_fin: new FormControl('', Validators.required),
    total: new FormControl('', Validators.required)
  });

  alquiler_id = 0;
  titulo = 'Nuevo Alquiler';

  constructor(
    private alquileresServicio: AlquileresService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.alquiler_id = parseInt(this.ruta.snapshot.paramMap.get('alquiler_id'));
    if (this.alquiler_id > 0) {
      this.alquileresServicio.uno(this.alquiler_id).subscribe((unalquiler) => {
        this.frm_Alquiler.controls['cliente_id'].setValue(Number(unalquiler.cliente_id));
        this.frm_Alquiler.controls['fecha_inicio'].setValue(Number(unalquiler.fecha_inicio));
        this.frm_Alquiler.controls['fecha_fin'].setValue(Number(unalquiler.fecha_fin));
        
this.frm_Alquiler.controls['total'].setValue(unalquiler.total);


        this.titulo = 'Editar Alquiler';
      });
    }
  }

  grabar() {
    let alquiler: Ialquileres = {
      alquiler_id: this.alquiler_id,
      vehiculo_id: Number(this.frm_Alquiler.controls['vehiculo_id'].value),  
  cliente_id: Number(this.frm_Alquiler.controls['cliente_id'].value),    
  fecha_inicio: Number (this.frm_Alquiler.controls['fecha_inicio'].value),
  fecha_fin: Number (this.frm_Alquiler.controls['fecha_fin'].value),
  total: this.frm_Alquiler.controls['total'].value,  
    };

    Swal.fire({
      title: 'Alquileres',
      text: '¿Desea guardar este alquiler?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.alquiler_id > 0) {
          this.alquileresServicio.actualizar(alquiler).subscribe((res: any) => {
            Swal.fire('Alquileres', res.mensaje, 'success');
            this.navegacion.navigate(['/alquileres']);
          });
        } else {
          this.alquileresServicio.insertar(alquiler).subscribe((res: any) => {
            Swal.fire('Alquileres', res.mensaje, 'success');
            this.navegacion.navigate(['/alquileres']);
          });
        }
      }
    });
  }
}
