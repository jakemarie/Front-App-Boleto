import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BoletoService } from '../../service/boleto.service';
import { Boleto } from '../../model/boleto';

@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.css']
})
export class BoletoComponent implements OnInit {

  dataAtual: any;
  boletoList: Boleto[] = [];

  boletoForm = this.fb.group(
    {
      descricao: [null, Validators.required],
      vencimento: [null, Validators.required],
      valor: [null, Validators.required],
      status: new FormControl('')
    }
  )

  constructor(private fb: FormBuilder, private boletoService: BoletoService) { }

  ngOnInit() {
    this.dataAtual = new Date().toISOString().slice(0, 10); 
    this.buscarBoletoPorDataAtual();
  }

  salvarBoletos() {
    if(this.boletoForm.valid) {
      console.log(this.boletoForm)
    } else {
      console.log("Formulario inválido")
      console.log(this.boletoForm.value)
      return;
    }
    
  }

  buscarBoletoPorDataAtual() {
    this.boletoService.buscarBoletoPorDataAtual().subscribe({
      next: (res) => {
        this.boletoList = res.dados
      },
      error: (error) =>{
        console.log(error)
      }
    })
  }

  buscarTodosBoleto() {
    this.boletoService.buscarTodosBoletos().subscribe({
      next: (res) => {
        this.boletoList = res.dados
      },
      error: (error) =>{
        console.log(error)
      }
    })
  }
  
  deletarBoleto(id: any) {
    this.boletoService.deletarBoleto(id).subscribe({
      next: (res) => {
        this.boletoList = res.dados
      },
      error: (error) =>{
        console.log(error)
      }
    })
  }

  salvarBoleto(boleto: Boleto) {
    this.boletoService.salvarBoleto(boleto).subscribe({
      next: (res) => {
        this.boletoList = res.dados
      },
      error: (error) =>{
        console.log(error)
      }
    })
  }

  editarBoleto(boleto: Boleto) {
    this.boletoService.editararBoleto(boleto).subscribe({
      next: (res) => {
        this.boletoList = res.dados
      },
      error: (error) =>{
        console.log(error)
      }
    })
  }

  buscarBoletoPorId(id: any) {
    this.boletoService.buscarBoletoPorId(id).subscribe({
      next: (res) => {
        console.log(res.dados)
      },
      error: (error) =>{
        console.log(error)
      }
    })
  }

}
