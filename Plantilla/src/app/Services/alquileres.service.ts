import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ialquileres } from '../Interfaces/ialquileres'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlquileresService {
  apiurl = 'http://localhost/EvaPar2/controllers/alquileres.controller.php?op=';

  constructor(private http: HttpClient) {}

  // Obtener todos los alquileres
  todos(): Observable<Ialquileres[]> {
    return this.http.get<Ialquileres[]>(this.apiurl + 'todos');
  }

  // Obtener un alquiler por ID
  uno(alquiler_id: number): Observable<Ialquileres> {
    const formData = new FormData();
    formData.append('alquiler_id', alquiler_id.toString());
    return this.http.post<Ialquileres>(this.apiurl + 'uno', formData);
  }

  // Eliminar un alquiler por ID
  eliminar(alquiler_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('alquiler_id', alquiler_id.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }

  // Insertar un nuevo alquiler
  insertar(alquiler: Ialquileres): Observable<string> {
    const formData = new FormData();
    formData.append('vehiculo_id', alquiler.vehiculo_id.toString());
    formData.append('cliente_id', alquiler.cliente_id.toString());
    formData.append('fecha_inicio', alquiler.fecha_inicio.toString());
    formData.append('fecha_fin', alquiler.fecha_fin.toString()); 
    formData.append('total', alquiler.total.toString());
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }  

  // Actualizar un alquiler existente
  actualizar(alquiler: Ialquileres): Observable<string> {
    const formData = new FormData();
    formData.append('alquiler_id', alquiler.alquiler_id.toString());
    formData.append('vehiculo_id', alquiler.vehiculo_id.toString());
    formData.append('cliente_id', alquiler.cliente_id.toString());
    formData.append('fecha_inicio', alquiler.fecha_inicio.toString());
    formData.append('fecha_fin', alquiler.fecha_fin.toString()); 
    formData.append('total', alquiler.total.toString());
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }
}
