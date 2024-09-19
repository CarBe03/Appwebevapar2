import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icliente } from '../Interfaces/icliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  apiurl = 'http://localhost/EvaPar2/controllers/clientes.controller.php?op=';
  constructor(private lector: HttpClient) {}

  buscar(texto: string): Observable<Icliente> {
    const formData = new FormData();
    formData.append('texto', texto);
    return this.lector.post<Icliente>(this.apiurl + 'uno', formData);
  }

  todos(): Observable<Icliente[]> {
    return this.lector.get<Icliente[]>(this.apiurl + 'todos');
  }
  uno(idClientes: number): Observable<Icliente> {
    const formData = new FormData();
    formData.append('idClientes', idClientes.toString());
    return this.lector.post<Icliente>(this.apiurl + 'uno', formData);
  }
  eliminar(idClientes: number): Observable<number> {
    const formData = new FormData();
    formData.append('idClientes', idClientes.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }
  insertar(cliente: Icliente): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', cliente.nombre);
    formData.append('apellido', cliente.apellido);
    formData.append('licencia', cliente.licencia);
    formData.append('telefono', cliente.telefono);
  
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }
  actualizar(cliente: Icliente): Observable<string> {
    const formData = new FormData();
    formData.append('idClientes', cliente.cliente_id.toString());
    formData.append('nombre', cliente.nombre);
    formData.append('apellido', cliente.apellido);
    formData.append('licencia', cliente.licencia);
    formData.append('telefono', cliente.telefono);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
