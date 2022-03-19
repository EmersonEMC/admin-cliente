import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DataTablesModule } from 'angular-datatables';
import { IMaskModule } from 'angular-imask';
import { RequiredModule } from 'src/app/shared/directives/required/required.module';

import { CadastroComponent } from './cadastro/cadastro.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ConsultaComponent } from './consulta/consulta.component';

@NgModule({
  declarations: [CadastroComponent, ConsultaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientesRoutingModule,
    DataTablesModule,
    RequiredModule,
    IMaskModule,
    SweetAlert2Module,
  ],
})
export class ClientesModule {}
