import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Boleto } from '../model/boleto';
import { ServiceResponse } from '../model/ServeseResponse';


@Injectable({
  providedIn: 'root'
})
export class BoletoService {

  private URL = `${environment.baseUrl}api/Boleto`

  constructor(private http: HttpClient) { }

  buscarBoletoPorDataAtual() {
    return this.http.get<ServiceResponse<Boleto[]>>(`${this.URL}/Boletos-data-atual`)
  }

  buscarTodosBoletos() {
    return this.http.get<ServiceResponse<Boleto[]>>(`${this.URL}`)
  }

  buscarBoletoPorId(id: any) {
    return this.http.get<ServiceResponse<Boleto>>(`${this.URL}/${id}`)
  }

  deletarBoleto(id: any) {
    return this.http.delete<ServiceResponse<Boleto[]>>(`${this.URL}/?id=${id}`)
  }

  editararBoleto(boleto: Boleto) {
    return this.http.put<ServiceResponse<Boleto[]>>(`${this.URL}`, boleto)
  }

  salvarBoleto(boleto: Boleto) {
    return this.http.post<ServiceResponse<Boleto[]>>(`${this.URL}`, boleto)
  }
}
