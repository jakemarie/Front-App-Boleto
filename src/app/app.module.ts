import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoletoComponent } from './components/boleto/boleto.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [	
    AppComponent,
    BoletoComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CurrencyMaskModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
