import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, Subject } from 'rxjs';
import { Reporte } from '../model/reporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  url: string = "https://aww-backend-grupo3.herokuapp.com/reporte"
  private listaCambio = new Subject<Reporte[]>()
  private confirmaEliminacion = new Subject<Boolean>()
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Reporte[]>(this.url);
  }

  insertar(reporte: Reporte) {

    return this.http.post(this.url, reporte);
  }

  modificar(reporte: Reporte) {

    return this.http.put(this.url, reporte);
  }

  eliminar(id: number) {

    return this.http.delete(`${this.url}/${id}`);
  }

  buscar(texto:string) {

    return this.http.post<Reporte[]>(`${this.url}/buscar`, texto);
  }

  listarId(id: number) {
    return this.http.get<Reporte>(`${this.url}/${id}`);
  }

  getLista() {
    return this.listaCambio.asObservable();
  }

  setLista(listaNueva: Reporte[]) {
    this.listaCambio.next(listaNueva);
  }

  getConfirmaEliminacion() {
    return this.confirmaEliminacion.asObservable();
  }

  setConfirmaEliminacion(estado: Boolean) {
    this.confirmaEliminacion.next(estado);
  }


}
