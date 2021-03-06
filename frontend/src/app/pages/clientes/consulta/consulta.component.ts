import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import * as IMask from 'imask';
import { BaseDataTablesComponent } from 'src/app/shared/datatables/base-resource-datatables.component';
import { SweetAlertResult } from 'sweetalert2';

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
  @ViewChild('deleteSwal')
  public readonly deleteSwal!: SwalComponent;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private readonly _clientesService: ClientesService,
    private renderer: Renderer2,
    private router: Router,
  ) {
    super(_clientesService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  private get _cpfMask(): IMask.MaskedPattern<string> {
    const mask = IMask.createMask({
      mask: '000.000.000-00',
    });
    return mask;
  }

  private get _phoneMask(): IMask.MaskedPattern<string> {
    const mask = IMask.createMask({
      mask: '(00) 00000-0000',
    });
    return mask;
  }

  builderTable(): DataTables.ColumnSettings[] | undefined {
    const maskedCpf = this._cpfMask;
    const maskedPhone = this._phoneMask;
    return [
      {
        title: 'ID',
        data: 'id',
      },
      {
        title: 'Nome',
        data: 'name',
      },
      {
        title: 'Data Nascimento',
        data: 'birthday',
        render: (birthday: string) => {
          return new DatePipe(this.locale).transform(birthday, 'dd/MM/yyyy');
        },
      },
      {
        title: 'CPF',
        data: 'cpf',
        render: (cpf: string) => {
          return maskedCpf.resolve(String(cpf));
        },
      },
      {
        title: 'RG',
        data: 'rg',
      },
      {
        title: 'Telefone',
        data: 'phone',
        render: (phone: string) => {
          return maskedPhone.resolve(String(phone));
        },
      },
      {
        title: 'Action',
        orderable: false,
        render: function (data: unknown, type: unknown, full: Cliente) {
          return `
          <button class="btn action" edit-client-id="${full.id}">EDITAR</button>
          <button class="btn action" remove-client-id="${full.id}">EXCLUIR</button>
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
      if (target) {
        if (target.hasAttribute('edit-client-id')) {
          const id = target.getAttribute('edit-client-id') ?? 0;
          void this.router.navigate([`/clientes/cadastro/editar/${id}`]);
        }

        if (target.hasAttribute('remove-client-id')) {
          const id = target.getAttribute('remove-client-id') ?? 0;
          this.deleteSwal.title = 'Aten????o';
          this.deleteSwal.text = `Deseja realmente deletar o cliente ${id}?`;

          void this.deleteSwal.fire().then((value: SweetAlertResult) => {
            if (value.isConfirmed) {
              this.deleteClient(id);
            }
          });
        }
      }
    });
  }

  private deleteClient(id: string | number): void {
    this._clientesService.delete(id).subscribe(() => {
      this.dtTrigger.next(this.dtOptions);
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
