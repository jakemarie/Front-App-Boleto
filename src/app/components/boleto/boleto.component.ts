import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.css']
})
export class BoletoComponent implements OnInit {

  boletoForm = this.fb.group(
    {
      descricao: [null, Validators.required],
      vencimento: [null, Validators.required],
      valor: [null, Validators.required],
      status: new FormControl('')
    }
  )

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
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
  

}
