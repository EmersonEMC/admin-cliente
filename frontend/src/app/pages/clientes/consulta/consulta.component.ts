import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseDataTablesComponent } from 'src/app/shared/datatables/base-resource-datatables.component';

import { ClientesService } from '../clientes.service';
import { Cliente } from '../entities/cliente.entity';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
})
export class ConsultaComponent
  extends BaseDataTablesComponent<Cliente>
  implements AfterViewInit, OnInit, OnDestroy
{
  constructor(
    private readonly _clientesService: ClientesService,
    private renderer: Renderer2,
    private router: Router,
  ) {
    super(_clientesService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  builderTable(): DataTables.ColumnSettings[] | undefined {
    return [
      {
        title: 'ID',
        data: 'id',
      },
      {
        title: 'Nome',
        data: 'nome',
      },
      {
        title: 'Data Nascimento',
        data: 'dataNascimento',
      },
      {
        title: 'CPF',
        data: 'cpf',
      },
      {
        title: 'RG',
        data: 'rg',
      },
      {
        title: 'Telefone',
        data: 'telefone',
      },
      {
        title: 'Action',
        render: function (data: unknown, type: unknown, full: Cliente) {
          return `
          <button class="btn action" edit-client-id="${full.id} ">EDITAR</button>
          <button class="btn action" remove-client-id="${full.id} ">EXCLUIR</button>
          `;
        },
      },
    ];
  }

  protected get defaultOptions(): DataTables.Settings {
    return Object.assign(super.defaultOptions, {
      dom: 'Blfrtip',
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.defaultOptions);
    this.renderer.listen('document', 'click', (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (target && target.hasAttribute('edit-client-id')) {
        const id = target.getAttribute('edit-client-id') ?? 0;
        void this.router.navigate([`/clientes/cadastro/editar/${id}`]);
      }
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
