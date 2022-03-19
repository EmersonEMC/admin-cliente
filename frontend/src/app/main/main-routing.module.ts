import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'clientes',
        loadChildren: () =>
          import('../pages/clientes/clientes.module').then(
            (m) => m.ClientesModule,
          ),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('../pages/usuarios/usuarios.module').then(
            (m) => m.UsuariosModule,
          ),
      },
      { path: '', redirectTo: 'clientes', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
