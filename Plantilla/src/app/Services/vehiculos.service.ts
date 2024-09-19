import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ivehiculos } from '../Interfaces/ivehiculos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  apiurl = 'http://localhost/Appwebevapar2/controllers/vehiculos.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<Ivehiculos[]> {
    return this.lector.get<Ivehiculos[]>(this.apiurl + 'todos');
  }

  uno(vehiculo_id: number): Observable<Ivehiculos> {
    const formData = new FormData();
    formData.append('vehiculo_id', vehiculo_id.toString());
    return this.lector.post<Ivehiculos>(this.apiurl + 'uno', formData);
  }

  eliminar(vehiculo_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('vehiculo_id', vehiculo_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(vehiculos: Ivehiculos): Observable<string> {
    const formData = new FormData();
    formData.append('Marca', vehiculos.marca.toString());
    formData.append('modelo', vehiculos.modelo.toString());
    formData.append('year', vehiculos.year.toString());
    formData.append('disponible', vehiculos.disponible.toString());

    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(vehiculos: Ivehiculos): Observable<string> {
    const formData = new FormData();
    formData.append('Marca', vehiculos.marca.toString());
    formData.append('modelo', vehiculos.modelo.toString());
    formData.append('year', vehiculos.year.toString());
    formData.append('disponible', vehiculos.disponible.toString());
   
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
