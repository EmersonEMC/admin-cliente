import { CadastroComponent } from './cadastro.component';

export const cadastroRouting = [
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'cadastro/editar/:id',
    component: CadastroComponent,
  },
];
