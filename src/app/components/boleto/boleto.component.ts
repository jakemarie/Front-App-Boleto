import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BoletoService } from '../../service/boleto.service';
import { Boleto } from '../../model/Boleto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.css']
})
export class BoletoComponent implements OnInit {

  dataAtual: any = this.formatarData(new Date());
  boletoList: Boleto[] = [];
  labelChecked: string = "Marque pra visualizar todos boletos.";
  checkedList: boolean = false;
  valorTotal: any = 0;
  boletoId: any;
  boletoDescricao: any;
  labelModal: string = "Cadastro Boleto";

  boletoForm = this.fb.group(
    {
      id: [null as any],
      descricao: ['', Validators.required],
      vencimento: [null as any, Validators.required],
      valor: [null as any, Validators.required],
      status: new FormControl('')
    }
  )

  constructor(private fb: FormBuilder, private boletoService: BoletoService, private toastr: ToastrService ) { }

  ngOnInit() {
    console.log(this.dataAtual)
    this.buscarBoletoPorDataAtual();
  }

  salvarBoletos() {
    if(this.boletoForm.valid) {
      if(this.boletoForm.get('id')?.value) {
        this.editarBoleto(this.criarBoleto());
      } else {
        this.boletoForm.get('status')?.setValue('1')
        this.salvarBoleto(this.criarBoleto())
      }
      this.boletoForm.reset()
    } else {
      return;
    }
    
  }

  criarBoleto(): Boleto {
    return {
      id: this.boletoForm.get('id')?.value ?? 0,
      descricao: this.boletoForm.get('descricao')?.value ?? "",
      vencimento: this.boletoForm.get('vencimento')?.value ?? new Date(),
      valor: this.boletoForm.get('valor')?.value ?? "",
      status: this.boletoForm.get('status')?.value ?? ""
    }
  }

  buscarBoletoPorDataAtual() {
    this.boletoService.buscarBoletoPorDataAtual().subscribe({
      next: (res) => {
        this.boletoList = res.dados
        this.valorTotal = 0

        this.boletoList.forEach(boleto => {
          this.valorTotal += boleto.valor;
        });

      },
      error: (error) =>{
        this.toastr.error(error,'Erro')
      }
    })
  }

  buscarTodosBoleto() {
    this.boletoService.buscarTodosBoletos().subscribe({
      next: (res) => {
      
        this.boletoList = res.dados
        this.valorTotal = 0

        this.boletoList.forEach(boleto => {
          this.valorTotal += boleto.valor;
        });
      },
      error: (error) =>{
        this.toastr.error(error,'Erro')
      }
    })
  }
  
  deletarBoleto(id: any) {
    this.boletoService.deletarBoleto(id).subscribe({
      next: (res) => {
        if(this.checkedList) {
          this.buscarTodosBoleto();
        } else {
          this.buscarBoletoPorDataAtual();
        }
        this.toastr.success('Boleto excluído com sucesso!','Sucesso')
      },
       error: (error) =>{
        this.toastr.error(error,'Erro')
      }
    })  
    
  }

  salvarBoleto(boleto: Boleto) {
    this.boletoService.salvarBoleto(boleto).subscribe({
      next: (res) => {
        if(this.checkedList) {
          this.buscarTodosBoleto();
        } else {
          this.buscarBoletoPorDataAtual();
        }
        this.toastr.success('Boleto salvo com sucesso!','Sucesso')
      },
      error: (error) =>{
        this.toastr.error(error,'Erro')
      }
    })
  }

  editarBoleto(boleto: Boleto) {
    this.boletoService.editararBoleto(boleto).subscribe({
      next: (res) => {
        if(this.checkedList) {
          this.buscarTodosBoleto();
        } else {
          this.buscarBoletoPorDataAtual();
        }
        this.toastr.success('Boleto editado com sucesso!','Sucesso')
      },
      error: (error) =>{
        this.toastr.error(error,'Erro')
      }
    })
  }

  buscarBoletoPorId(id: any) {
    this.boletoService.buscarBoletoPorId(id).subscribe({
      next: (res) => {
        this.labelModal = "Edição Boleto"
        this.boletoForm.get('id')?.setValue(res.dados.id)
        this.boletoForm.get('descricao')?.setValue(res.dados.descricao)
        this.boletoForm.get('vencimento')?.setValue(res.dados.vencimento.toString().slice(0, 10))
        this.boletoForm.get('valor')?.setValue(res.dados.valor)
        this.boletoForm.get('status')?.setValue(res.dados.status == 'Pago' ? '0' : '1')
      },
      error: (error) =>{
        this.toastr.error(error,'Erro')
      }
    })
  }

  converteMoeda(value: any) {
    return value.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  }

  corStatusTable(status: string) {
    if(status == "Pago") {
      return 'table-success'
    }

    if(status == "Vencido") {
      return'table-danger'
    }
    return ""
  } 

  alternarBuscarBoletos(value: any) {
    this.checkedList = value.target.checked
    if(value.target.checked) {
      this.buscarTodosBoleto();
      this.labelChecked = "Desmarque para visualizar os boletos a serem pagos hoje."
    } else {
      this.buscarBoletoPorDataAtual();
      this.labelChecked = "Marque para visualizar todos boletos."
    }
  }
  
  setBoleto(id: any, descricao: any) {
    this.boletoId = id;
    this.boletoDescricao = descricao;
  }

  statusVenvimento(status: any, data: Date) {
    const dataAtualMenosUm = new Date()
    dataAtualMenosUm.setDate(dataAtualMenosUm.getDate() - 1)

    if(status == "AguardandoPagamento" && (dataAtualMenosUm.getTime() > new Date(data).getTime())) {
      return "Vencido"
    }
    if(status == "AguardandoPagamento") {
      return "Aguardando Pagamento"
    }
    return status;
  }

  formatarData(data: Date): string {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); 
    const dia = data.getDate().toString().padStart(2, '0');
  
    return `${ano}-${mes}-${dia}`;
  }

}
