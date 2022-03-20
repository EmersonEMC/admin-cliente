import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { cadastroRouting } from './cadastro/cadastro.routing';
import { consultaRouting } from './consulta/consulta.routing';

const routes: Routes = [...consultaRouting, ...cadastroRouting];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
